
// window.chroma = require("chroma-js");
const chroma = require("chroma-js");
// import chroma from "chroma-js";
// console.log(1234,chroma);

class ColorRick
{
    constructor(options)
    {
        this._elements=[];

        this.options=options;

        this._areaWidth=256;
        this._areaHeight=150;

        this._elContainer = document.createElement("div");
        this._elContainer.classList.add("colorpick_dialog");
        document.body.appendChild(this._elContainer);
        this._elements.push(this._elContainer);

        this._elContainer.style.setProperty('--width', this._areaWidth + "px");
        this._elContainer.style.setProperty('--height', this._areaHeight + "px");


        this._elArea = document.createElement("div");
        this._elArea.classList.add("colorpick_area");
        this._elContainer.appendChild(this._elArea);
        this._elements.push(this._elArea);

        this._elAreaCursor = document.createElement("div");
        this._elAreaCursor.classList.add("colorpick_cursor");
        this._elArea.appendChild(this._elAreaCursor);
        this._elements.push(this._elAreaCursor);

        this._elBrightness = document.createElement("div");
        this._elBrightness.classList.add("colorpick_brightness");
        this._elArea.appendChild(this._elBrightness);
        this._elements.push(this._elBrightness);


        this._elHue = document.createElement("div");
        this._elHue.classList.add("colorpick_hue");
        this._elContainer.appendChild(this._elHue);
        this._elements.push(this._elHue);

        this._elHueCursor = document.createElement("div");
        this._elHueCursor.classList.add("colorpick_cursor_hue");
        this._elHue.appendChild(this._elHueCursor);
        this._elements.push(this._elHueCursor);

        this._elColorBox = document.createElement("div");
        this._elColorBox.classList.add("colorpick_preview");
        this._elContainer.appendChild(this._elColorBox);
        this._elements.push(this._elColorBox);

        this._elColorBoxOrig = document.createElement("div");
        this._elColorBoxOrig.classList.add("colorpick_preview");
        this._elColorBoxOrig.classList.add("colorpick_preview_orig");
        this._elContainer.appendChild(this._elColorBoxOrig);
        this._elements.push(this._elColorBoxOrig);

        this._elInputContainer = document.createElement("div");
        this._elInputContainer.classList.add("colorpick_inputcontainer");
        this._elContainer.appendChild(this._elInputContainer);
        this._elements.push(this._elInputContainer);

        const inputs=
            "<table>"+
                "<tr>"+
                    "<td>"+
                        "HEX"+
                    "</td>"+
                    "<td class=\"right\">"+
                        "<input id=\"colorpick_input_hex\" class=\"colorpick_input colorpick_input_hex\" />"+
                    "</td>"+
                "</tr>"+
                "<tr>"+
                    "<td>"+
                        "RGB"+
                    "</td>"+
                    "<td class=\"right\">"+
                        "<input id=\"colorpick_input_r\" class=\"colorpick_input colorpick_input_small\" />"+
                        "<input id=\"colorpick_input_g\" class=\"colorpick_input colorpick_input_small\" />"+
                        "<input id=\"colorpick_input_b\" class=\"colorpick_input colorpick_input_small\" />"+
                    "</td>"+
                "</tr>"+
                "<tr>"+
                    "<td>"+
                        "HSV"+
                    "</td>"+
                    "<td class=\"right\">"+
                        "<input id=\"colorpick_input_h\" class=\"colorpick_input colorpick_input_small\" />"+
                        "<input id=\"colorpick_input_s\" class=\"colorpick_input colorpick_input_small\" />"+
                        "<input id=\"colorpick_input_v\" class=\"colorpick_input colorpick_input_small\" />"+
                    "</td>"+
                "</tr>"+
            "</table>";


        this._elInputContainer.innerHTML=inputs;

        this._inputHex=document.getElementById("colorpick_input_hex");

        this._inputR=document.getElementById("colorpick_input_r");
        this._inputG=document.getElementById("colorpick_input_g");
        this._inputB=document.getElementById("colorpick_input_b");

        this._inputH=document.getElementById("colorpick_input_h");
        this._inputS=document.getElementById("colorpick_input_s");
        this._inputV=document.getElementById("colorpick_input_v");

        this._elements.push(this._inputHex);
        this._elements.push(this._inputR,this._inputG,this._inputB);
        this._elements.push(this._inputH,this._inputS,this._inputV);
        

        this._color=chroma("white");



        if(this.options.color)
        {
            this.setColor(this.options.color);
        }

        this._elColorBoxOrig.style.backgroundColor=this._color.hex();

        this.updateColorField();



        this._inputR.addEventListener("input",(e)=>
        {
            this._setColorFromRgbInputs();
        });

        this._inputG.addEventListener("input",(e)=>
        {
            this._setColorFromRgbInputs();
        });

        this._inputB.addEventListener("input",(e)=>
        {
            this._setColorFromRgbInputs();
        });



        this._inputHex.addEventListener("input",(e)=>
        {
            if(this.validateHexInput()) this.setColor(this.validateHexInput())
        });

        this._inputHex.addEventListener("blur",(e)=>
        {
            if(!this.validateHexInput()) 
            {
                this._inputHex.classList.remove("colorpick_invalid");
                this._inputHex.value=this._color.hex();
            }

        });

        this._elHue.addEventListener("pointerdown",this._onHueMouse.bind(this));
        this._elHue.addEventListener("pointermove",this._onHueMouse.bind(this));

        this._elHue.addEventListener("wheel",(e)=>
        {
            const speed=0.1;
            
            if(e.deltaY>0)this._hue-=speed;
            else this._hue+=speed;

            this.updateColorField();
            e.preventDefault();
        });

        if(this.options.ele)
        {
            const r=this.options.ele.getBoundingClientRect();

            const padding=30;
            const containerSize=this._elContainer.getBoundingClientRect();
            const leftAligned=(r.x+padding)>window.innerWidth-containerSize.width;

            if(!leftAligned) this._elContainer.style.left=(r.x+padding)+"px";
            else this._elContainer.style.left=(r.x-containerSize.width)+"px";
            
            if(r.y+containerSize.height>window.innerHeight) this._elContainer.style.top=(window.innerHeight-containerSize.height-10)+"px";
            else this._elContainer.style.top=(r.y)+"px";
        }

        this._elHue.addEventListener("pointerdown",(e)=> { this._elHue.setPointerCapture(e.pointerId); });
        this._elHue.addEventListener("pointerup",(e)=> { this._elHue.releasePointerCapture(e.pointerId); });

        this._elArea.addEventListener("pointerdown",this._onAreaMouse.bind(this));
        this._elArea.addEventListener("pointermove",this._onAreaMouse.bind(this));
        this._elArea.addEventListener("wheel",(e)=>
        {
            const speed=0.00025;
            
            if(e.deltaY>0)this._hueV-=speed;
            else this._hueV+=speed;

            this.updateColorField();
            e.preventDefault();
        });
        this._elArea.addEventListener("pointerdown",(e)=> { this._elArea.setPointerCapture(e.pointerId); });
        this._elArea.addEventListener("pointerup",(e)=> { this._elArea.releasePointerCapture(e.pointerId); });

        document.addEventListener("pointerdown",this._clickOutside.bind(this));

        this._elColorBoxOrig.addEventListener("click",()=>{
            this.setColor(this._elColorBoxOrig.style.backgroundColor);
        });
    }

    _clickOutside(e)
    {
        if(this._elContainer.contains(e.target)) return true;

        this.close();
    }

    validateHexInput()
    {
        let v=this._inputHex.value;
        if(v.indexOf("#")==-1) v="#"+v;
        const valid=v.length==7;

        if(valid) 
        {
            this._inputHex.classList.remove("colorpick_invalid");
            return v;
        }
        else this._inputHex.classList.add("colorpick_invalid");
            
    }


    _setColorFromRgbInputs()
    {
        console.log("_setColorFromRgbInputs",this._inputR.value,this._inputG.value,this._inputB.value);
        this.setColor([parseInt(this._inputR.value),parseInt(this._inputG.value),parseInt(this._inputB.value)]);
    }

    setColor(c)
    {
        this._color=chroma(c);
        this._hue=this._color.hsv()[0];
        this._hueS=this._color.hsv()[1];
        this._hueV=this._color.hsv()[2];
        this.updateColorField();
    }


    updateCursors()
    {
        if(this._color.luminance()>0.55)this._elAreaCursor.style.backgroundColor="black";
        else this._elAreaCursor.style.backgroundColor="white";

        this._elHueCursor.style.top=(this._areaHeight-(this._hue/360*this._areaHeight))+"px";
        this._elAreaCursor.style.marginLeft=(this._color.hsv()[1]*this._areaWidth-3)+"px";
        this._elAreaCursor.style.marginTop=(this._areaHeight-(this._color.hsv()[2]*this._areaHeight)-3)+"px";
    }

    updateColorField()
    {
        // const rgb=this._color.rgb();

        if(this._hue!=this._hue)this._hue=0;
        if(this._hue<0)this._hue=0.0;
        if(this._hue>360)this._hue=360;

        if(this._hueV!=this._hueV)this._hueV=0.0001;
        if(this._hueV<0)this._hueV=0.0001;
        if(this._hueV>1)this._hueV=1;

        if(this._hueS!=this._hueS)this._hueS=0.0001;
        if(this._hueS<0)this._hueS=0.0001;
        if(this._hueS>1)this._hueS=1;

        this._color=chroma(this._hue, this._hueS, this._hueV, 'hsv');

        if(this.options.onChange && this._currentHex!=this._color.hex())this.options.onChange(this._color);
        this._currentHex=this._color.hex();

        const rgb_bgcol=chroma(this._hue, 1,1, 'hsv').rgb();
        this._elArea.style.background="linear-gradient(to right, rgb(255, 255, 255), rgb("+rgb_bgcol[0]+", "+rgb_bgcol[1]+", "+rgb_bgcol[2]+"))"

        this._elColorBox.style.backgroundColor=this._color.hex();
        this._inputHex.value=this._color.hex();

        this._inputR.value=this._color.rgb()[0];
        this._inputG.value=this._color.rgb()[1];
        this._inputB.value=this._color.rgb()[2];

        this._inputH.value=this._color.hsv()[0];
        this._inputS.value=this._color.hsv()[1];
        this._inputV.value=this._color.hsv()[2];

        this.updateCursors();
    }

    close()
    {
        document.removeEventListener("pointerdown",this._clickOutside.bind(this));

        for(let i=0;i<this._elements.length;i++) this._elements[i].remove();
    }

    _onHueMouse(e)
    {
        if(e.buttons==1)
        {
            const y=Math.min(this._areaHeight,Math.max(0,e.offsetY));

            this._hue=(1.0-(y/this._areaHeight))*360;
            
            this.updateColorField();
        }
    }

    _onAreaMouse(e)
    {
        if(e.buttons==1)
        {
            const x=Math.min(this._areaWidth,Math.max(0,e.offsetX));
            const y=Math.min(this._areaHeight,Math.max(0,e.offsetY));
            
            this._hueV=1.0-(y/this._areaHeight);
            this._hueS=(x/this._areaWidth);

            this.updateColorField()
        }
    }
};

module.exports=ColorRick;

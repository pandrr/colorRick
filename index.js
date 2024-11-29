const chroma = require("chroma-js");

class ColorRick
{
    constructor(options)
    {
        this._elements=[];

        this.options=options;
        this._opacity=options.opacity;

        this._areaWidth=256;
        this._areaHeight=150;

        this._elContainer = document.createElement("div");
        this._elContainer.classList.add("colorRick_dialog");
        document.body.appendChild(this._elContainer);
        this._elements.push(this._elContainer);

        if(!options.showOpacity) 
        {
            this._elContainer.style.setProperty('--width-opacity', "0px");
            this._elContainer.style.setProperty('--pad-opacity', "0px");
        }



        this._elContainer.style.setProperty('--width', this._areaWidth + "px");
        this._elContainer.style.setProperty('--height', this._areaHeight + "px");


        this._elArea = document.createElement("div");
        this._elArea.classList.add("colorRick_area");
        this._elContainer.appendChild(this._elArea);
        this._elements.push(this._elArea);

        this._elAreaCursor = document.createElement("div");
        this._elAreaCursor.classList.add("colorRick_cursor");
        this._elArea.appendChild(this._elAreaCursor);
        this._elements.push(this._elAreaCursor);

        this._elBrightness = document.createElement("div");
        this._elBrightness.classList.add("colorRick_brightness");
        this._elArea.appendChild(this._elBrightness);
        this._elements.push(this._elBrightness);

        // hue slider

        this._elHue = document.createElement("div");
        this._elHue.classList.add("colorRick_hue");
        this._elContainer.appendChild(this._elHue);
        this._elements.push(this._elHue);

        this._elHueCursor = document.createElement("div");
        this._elHueCursor.classList.add("colorRick_cursor_hue");
        this._elHue.appendChild(this._elHueCursor);
        this._elements.push(this._elHueCursor);

        // eye dropper

        if(window.EyeDropper)
        {
            this._elDropper = document.createElement("div");
            this._elDropper.classList.add("colorRick_eyeDrop");
            this._elContainer.appendChild(this._elDropper);
            this._elements.push(this._elDropper);
    
        }



        // opacity slider

        if(options.showOpacity) 
        {
            this._elOpacity = document.createElement("div");
            this._elOpacity.classList.add("colorRick_opacity");
            this._elContainer.appendChild(this._elOpacity);
            this._elements.push(this._elOpacity);

            this._elOpacityCursor = document.createElement("div");
            this._elOpacityCursor.classList.add("colorRick_cursor_opacity");
            this._elOpacity.appendChild(this._elOpacityCursor);
            this._elements.push(this._elOpacityCursor);
        }


        this._elColorBox = document.createElement("div");
        this._elColorBox.classList.add("colorRick_preview");
        this._elContainer.appendChild(this._elColorBox);
        this._elements.push(this._elColorBox);

        this._elColorBoxOrig = document.createElement("div");
        this._elColorBoxOrig.classList.add("colorRick_preview");
        this._elColorBoxOrig.classList.add("colorRick_preview_orig");
        this._elContainer.appendChild(this._elColorBoxOrig);
        this._elements.push(this._elColorBoxOrig);

        this._elInputContainer = document.createElement("div");
        this._elInputContainer.classList.add("colorRick_inputcontainer");
        this._elContainer.appendChild(this._elInputContainer);
        this._elements.push(this._elInputContainer);

        
        let inputs=
            "<table>"+
                "<tr>"+
                    "<td>"+
                        "HEX"+
                    "</td>"+
                    "<td class=\"right\">"+
                        "<input id=\"colorRick_input_hex\" class=\"colorRick_input colorRick_input_hex\" />"+
                        "<div class=\"opacity_title\" id=\"colorrick_opacity_title\">Opacity:</div> <input id=\"colorRick_input_opacity\" class=\"colorRick_input colorRick_input_small\" />"+
                    "</td>"+
                "</tr>"+
                "<tr>"+
                    "<td>"+
                        "RGB"+
                    "</td>"+
                    "<td class=\"right\">"+
                        "<input id=\"colorRick_input_r\" class=\"colorRick_input colorRick_input_small\" />"+
                        "<input id=\"colorRick_input_g\" class=\"colorRick_input colorRick_input_small\" />"+
                        "<input id=\"colorRick_input_b\" class=\"colorRick_input colorRick_input_small\" />"+
                    "</td>"+
                "</tr>"+
                "<tr>"+
                    "<td>"+
                        "HSV"+
                    "</td>"+
                    "<td class=\"right\">"+
                        "<input id=\"colorRick_input_h\" class=\"colorRick_input colorRick_input_small\" />"+
                        "<input id=\"colorRick_input_s\" class=\"colorRick_input colorRick_input_small\" />"+
                        "<input id=\"colorRick_input_v\" class=\"colorRick_input colorRick_input_small\" />"+
                    "</td>"+
                "</tr>"+
            "</table>";


        this._elInputContainer.innerHTML=inputs;

        this._inputHex=document.getElementById("colorRick_input_hex");

        this._inputOpacity=document.getElementById("colorRick_input_opacity");
        
        if(!options.showOpacity) 
        {
            this._inputOpacity1=document.getElementById("colorrick_opacity_title");
            this._inputOpacity1.style.opacity=0.0;
            this._inputOpacity.style.opacity=0.0;
        }

        this._inputR=document.getElementById("colorRick_input_r");
        this._inputG=document.getElementById("colorRick_input_g");
        this._inputB=document.getElementById("colorRick_input_b");

        this._inputH=document.getElementById("colorRick_input_h");
        this._inputS=document.getElementById("colorRick_input_s");
        this._inputV=document.getElementById("colorRick_input_v");

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


        this._inputH.addEventListener("input",(e)=>
        {
            this._setColorFromHsvInputs();
        });

        this._inputS.addEventListener("input",(e)=>
        {
            this._setColorFromHsvInputs();
        });

        this._inputV.addEventListener("input",(e)=>
        {
            this._setColorFromHsvInputs();
        });




        this._inputHex.addEventListener("input",(e)=>
        {
            if(this.validateHexInput()) this.setColor(this.validateHexInput())
        });

        this._inputHex.addEventListener("blur",(e)=>
        {
            if(!this.validateHexInput()) 
            {
                this._inputHex.classList.remove("colorRick_invalid");
                this._inputHex.value=this._color.hex();
            }

        });

        this._inputOpacity.addEventListener("input",(e)=>
        {
            const f=parseFloat(this._inputOpacity.value);

            if(f===f)
            {
                this._opacity=parseFloat(this._inputOpacity.value);
                console.log(this._opacity)
                this.updateColorField();
            }
        });



        this._elHue.addEventListener("pointerdown",this._onHueMouse.bind(this));
        this._elHue.addEventListener("pointermove",this._onHueMouse.bind(this));

        
        if(this._elOpacity) this._elOpacity.addEventListener("pointerdown",this._onOpacityMouse.bind(this));
        if(this._elOpacity) this._elOpacity.addEventListener("pointermove",this._onOpacityMouse.bind(this));

        if(this._elOpacity) this._elOpacity.addEventListener("wheel",(e)=>
        {
            let speed=0.003;
            if(e.altKey)speed/=3;
            if(e.deltaY>0)this._opacity-=speed;
            else this._opacity+=speed;
    
            this.updateColorField();
            
            e.preventDefault();
        },{"passive":false});

        
        this._elHue.addEventListener("wheel",(e)=>
        {
            let speed=0.5;
            if(e.altKey)speed/=3;
            this._hue=parseFloat(this._hue);

            if(e.deltaY>0)this._hue-=speed;
            else this._hue+=speed;
            this._inputH.value=this._hue;

            this._setColorFromHsvInputs();
            
            e.preventDefault();
        },{"passive":false});


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

        this._elHue.addEventListener("pointerdown",(e)=> { this._elHue.setPointerCapture(e.pointerId); if(this.options.onStart)this.options.onStart();});
        this._elHue.addEventListener("pointerup",(e)=> { this._elHue.releasePointerCapture(e.pointerId); if(this.options.onEnd)this.options.onEnd();});

        this._elArea.addEventListener("pointerdown",(e)=> { this._elArea.setPointerCapture(e.pointerId); if(this.options.onStart)this.options.onStart();});
        this._elArea.addEventListener("pointerup",(e)=> { this._elArea.releasePointerCapture(e.pointerId); if(this.options.onEnd)this.options.onEnd();});


        this._elArea.addEventListener("pointerdown",this._onAreaMouse.bind(this));
        this._elArea.addEventListener("pointermove",this._onAreaMouse.bind(this));
        this._elArea.addEventListener("wheel",(e)=>
        {
            let speed=0.008;
            if(e.altKey)speed/=3;
            
            if(e.deltaY>0)this._hueV-=speed;
            else this._hueV+=speed;

            this._inputV.value=this._hueV;

            this.updateColorField();
            e.preventDefault();

        },{"passive":false});

        this._elArea.addEventListener("pointerdown",(e)=> { this._elArea.setPointerCapture(e.pointerId); });
        this._elArea.addEventListener("pointerup",(e)=> { this._elArea.releasePointerCapture(e.pointerId); });

        if(!this.options.noCloseOutside)
            document.addEventListener("pointerdown",this._clickOutside.bind(this));

        if(this._elDropper)
            this._elDropper.addEventListener("click",()=>
            {
                let picker = new EyeDropper().open();
                picker.then((a) =>
                {
                    this._inputHex.value=a.sRGBHex;
                    this.setColor(this.validateHexInput())
                });
        });

        this._elColorBoxOrig.addEventListener("click",()=>{
            this.setColor(this._elColorBoxOrig.style.backgroundColor);
        });
    }

    _clickOutside(e)
    {
        if(this.options.noCloseOutside)return;
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
            this._inputHex.classList.remove("colorRick_invalid");
            return v;
        }
        else this._inputHex.classList.add("colorRick_invalid");
    }

    setHsvInputs(h,s,v)
    {
        if(parseFloat(h)!=parseFloat(h)) h=0; // when grey
        this._inputH.value=parseFloat(h)||0;
        this._inputS.value=parseFloat(s)||0;
        this._inputV.value=parseFloat(v)||0;
    }

    _setColorFromHsvInputs()
    {
        this._hue=parseFloat(this._inputH.value)||0;
        this._hueS=parseFloat(this._inputS.value);
        this._hueV=parseFloat(this._inputV.value);

        this.updateColorField();
    }

    _setColorFromRgbInputs()
    {
        this.setColor([parseInt(this._inputR.value),parseInt(this._inputG.value),parseInt(this._inputB.value)]);
    }

    setColor(c)
    {
        this._color=chroma(c);
        this._hue=this._color.hsv()[0];
        this._hueS=this._color.hsv()[1];
        this._hueV=this._color.hsv()[2];

        this.setHsvInputs(this._color.hsv()[0], this._inputS.value=this._color.hsv()[1], this._inputV.value=this._color.hsv()[2]);

        this.updateColorField();
    }

    updateCursors()
    {
        if(this._color.luminance()>0.55)this._elAreaCursor.style.backgroundColor="black";
        else this._elAreaCursor.style.backgroundColor="white";

        if(this._elOpacityCursor)this._elOpacityCursor.style.top=(this._areaHeight-(this._opacity*this._areaHeight))+"px";
        this._elHueCursor.style.top=(this._areaHeight-(this._hue/360*this._areaHeight))+"px";
        this._elAreaCursor.style.marginLeft=(this._color.hsv()[1]*this._areaWidth-3)+"px";
        this._elAreaCursor.style.marginTop=(this._areaHeight-(this._color.hsv()[2]*this._areaHeight)-3)+"px";
    }

    validateHSV()
    {

    }

    updateColorField()
    {
        if(this._hue!=this._hue)this._hue=0;
        if(this._hue<0)this._hue=0;
        if(this._hue>360)this._hue=360;

        if(this._hueV!=this._hueV)this._hueV=0.0001;
        if(this._hueV<0)this._hueV=0.0001;
        if(this._hueV>1)this._hueV=1;

        if(this._hueS!=this._hueS)this._hueS=0.0001;
        if(this._hueS<0)this._hueS=0.0001;
        if(this._hueS>1)this._hueS=1;

        this._color=chroma(this._hue%360, this._hueS, this._hueV, 'hsv');

        if(this.options.onChange && (this._currentHex!=this._color.hex() || this._currentOpacity!=this._opacity))this.options.onChange(this._color,this._opacity);
        this._currentHex=this._color.hex();
        this._currentOpacity=this._opacity;

        const rgb_bgcol=chroma(this._hue%360, 1,1, 'hsv').rgb();
        this._elArea.style.background="linear-gradient(to right, rgb(255, 255, 255), rgb("+rgb_bgcol[0]+", "+rgb_bgcol[1]+", "+rgb_bgcol[2]+"))"


        
        
        if(this._elOpacity)
        {
            this._elColorBox.style.background="linear-gradient(to right,rgba("+this._color.rgb()[0]+","+this._color.rgb()[1]+","+this._color.rgb()[2]+",1) 50%,rgba("+this._color.rgb()[0]+","+this._color.rgb()[1]+","+this._color.rgb()[2]+","+this._opacity+") 51%)";
            this._elOpacity.style.background="linear-gradient(rgba("+this._color.rgb()[0]+","+this._color.rgb()[1]+","+this._color.rgb()[2]+",1),rgba("+this._color.rgb()[0]+","+this._color.rgb()[1]+","+this._color.rgb()[2]+",0))"
        }
        else
        {
            this._elColorBox.style.backgroundColor=this._color.hex();
        }


        if(this._inputOpacity.value!=this._opacity) this._inputOpacity.value=Math.round(this._opacity*10000)/10000;
        this._inputHex.value=this._color.hex();

        this._inputR.value=this._color.rgb()[0];
        this._inputG.value=this._color.rgb()[1];
        this._inputB.value=this._color.rgb()[2];

        this.updateCursors();
    }

    close()
    {
        if(!this.options.noCloseOutside)
            document.removeEventListener("pointerdown",this._clickOutside.bind(this));

        for(let i=0;i<this._elements.length;i++) this._elements[i].remove();
    }

    _onHueMouse(e)
    {
        if(e.buttons==1)
        {
            const y=Math.min(this._areaHeight,Math.max(0,e.offsetY));

            this._hue=(1.0-(y/this._areaHeight))*360;

            this.setHsvInputs(this._hue,this._hueS,this._hueV);

            this.updateColorField();
        }
    }

    _onOpacityMouse(e)
    {
        if(e.buttons==1)
        {
            const y=Math.min(this._areaHeight,Math.max(0,e.offsetY));

            this._opacity=(1.0-(y/this._areaHeight));
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

            this._inputS.value=this._hueS;
            this._inputV.value=this._hueV;
            this._setColorFromHsvInputs();
            
        }
    }
};

module.exports=ColorRick;


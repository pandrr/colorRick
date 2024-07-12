# colorRick

simple colorpicker without bullshit

![screenshot](https://github.com/pandrr/colorRick/assets/98792/4d580d68-1848-4cea-8f3e-f03c63ac521e)

used in https://cables.gl

## Build

`npx webpack`

## Usage

```
    const cr=new ColorRick(
        {
            "ele": element,
            "color": "#77aa55",
            "opacity": 1.0,
            "showOpacity": true,
            "onChange": (color,opacity)=>
                {
                    console.log(color,opacity);
                }
        });
    

```
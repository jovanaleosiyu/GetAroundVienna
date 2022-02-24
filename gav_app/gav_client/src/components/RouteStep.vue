<template>
        <svg v-if="this.stepName != ''" :width="width" height="10" class="mx-1">
            <rect rx="5" ry="5" width="100%" height="10" :fill="getColor(stepType)"/>
        </svg>
        <div class="dottedLine mx-1" :style="`width: ${width}`" v-else></div>
</template>

<script>
    export default {
        data() {
            return {
                width: this.duration*100/this.translateTripDuration(this.tripDuration) + "%",

                //Ka
                transportTypes: [
                    {type: "", color: "grey"},
                    {type: "U-Bahn", colors:[
                        {name: "U-Bahn U1", color: "red"},
                        {name: "U-Bahn U2", color: "purple"},
                        {name: "U-Bahn U3", color: "orange"},
                        {name: "U-Bahn U4", color: "green"},
                        {name: "U-Bahn U6", color: "#5e3200"},
                    ]},
                ],
            }
        },
        props: {
            stepName: {
                type: String,
            },
            stepType: {
                type: String,
                default: "",
            },
            duration: {
                type: String,
            },
            tripDuration: {
                type: String,
            },
        },
        methods: {
            getColor(stepType) {
                for(var i = 0; i < this.transportTypes.length; i++){
                    if(stepType == this.transportTypes[i].type && stepType != "U-Bahn") return this.transportTypes[i].color;
                    else if (stepType == "U-Bahn"){
                        for(var c = 0; c < this.transportTypes[1].colors.length; c++){
                            if (this.stepName == this.transportTypes[1].colors[c].name){
                                console.log(this.transportTypes[1].colors[c].color);
                                return this.transportTypes[1].colors[c].color;
                            } 
                            // this.transportTypes[1].colors.color[c]
                        }
                    }
                }
                return "cyan"
            },
            translateTripDuration(tripDuration){
                var splitDuration = tripDuration.split(':');
                return parseInt(splitDuration[0])*60 + parseInt(splitDuration[1]);
            }
        },
        created () {
            console.log("Name: " + this.stepName);
            console.log("Type: " + this.stepType);
            console.log("Step Duration: " + this.duration);
            console.log("Duration: " + this.tripDuration);
            console.log("Duration in Min: " + this.translateTripDuration(this.tripDuration));
            console.log("Länge: " + this.width);
            console.log("Länge der U-Bahnliste: " + this.transportTypes[1].colors.length);
            console.log("---------------");
        },
    }
</script>

<style lang="scss" scoped>
.dottedLine{
  border-top: 7px grey dotted;
}
</style>
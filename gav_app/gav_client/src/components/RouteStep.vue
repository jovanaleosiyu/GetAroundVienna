<template>
        <svg v-if="this.fill != ''" :width="width" height="10" class="mx-1">
            <rect rx="5" ry="5" width="100%" height="10" :fill="getColor(fill)"/>
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
                    {type: "U-Bahn", color: "green"},
                ],
            }
        },
        props: {
            fill: {
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
            getColor(type) {
                for(var i = 0; i < this.transportTypes.length; i++){
                    if(type == this.transportTypes[i].type) return this.transportTypes[i].color;
                }
                return "cyan"
            },
            translateTripDuration(tripDuration){
                var splitDuration = tripDuration.split(':');
                return parseInt(splitDuration[0])*60 + parseInt(splitDuration[1]);
            }
            //Fall type U-Bahn dann name schicken ?
        },
    }
</script>

<style lang="scss" scoped>
.dottedLine{
  border-top: 7px grey dotted;
}
</style>
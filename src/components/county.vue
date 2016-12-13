<template>
  <select :class="[className, 'county']" :style="style" :name="name" v-model="selected" @change="$emit('change', $event.target.value)">
    <option v-for="county in counties">{{ county }}</option>
  </select>
</template>

<script>
  export default {
    props: {
      className: { type: String },
      name:      { type: String, default: 'county' },
      value:     { type: String },
      counties:  { type: Array },
    },
    computed: {
      style() {
        return {
          width: 'calc((100% - 8px) / 3)'
        };
      },
			selected() {
				return this.value;
			}
    },
  };
</script>

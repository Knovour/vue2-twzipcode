<template>
  <select :class="[className, 'district']" :style="style" :name="name" v-model="selected" @change="$emit('change', $event.target.value)">
    <option v-for="district in districts">{{ district }}</option>
  </select>
</template>

<script>
  export default {
    props: {
      className: { type: String },
      name:      { type: String, default: 'district' },
      value:     { type: String },
      districts: { type: Array },
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

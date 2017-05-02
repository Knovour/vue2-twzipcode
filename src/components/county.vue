<template>
	<select class="county" style="width: calc((100% - 8px) / 3)" :name="name" v-model.lazy="val">
		<option v-for="county in counties">{{ county }}</option>
	</select>
</template>

<script>
	export default {
		data() {
			return {
				val: this.value
			}
		},
		props: {
			className: String,
			name: { type: String, default: 'county' },
			value: String,
			counties: Array,
		},
		watch: {
			val() {
				this.$emit('change', this.val);
			},
			value() {
				this.val = this.value;
			}
		}
	};
</script>

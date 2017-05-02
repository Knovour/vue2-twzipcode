<template>
	<select class="district" style="width: calc((100% - 8px) / 3)" :name="name" v-model.lazy="val">
		<option v-for="district in districts">{{ district }}</option>
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
			name: { type: String, default: 'district' },
			value: String,
			districts: Array
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

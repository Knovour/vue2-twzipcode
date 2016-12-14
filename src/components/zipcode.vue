<template>
	<input
		:class="[className, 'zipcode']"
		:style="style"
		type="text"
		maxLength="3"
		v-model="val"
		:name="name"
		:placeholder="placeholder"
		@input="update($event.target.value)"
	/>
</template>

<script>
	export default {
		props: {
			className:   { type: String },
			name:        { type: String, default: 'zipcode' },
			placeholder: { type: String },
			value:       { type: String },
		},
		computed: {
			style() {
				return {
					width: 'calc((100% - 8px) / 3)'
				};
			},
			val() {
				return this.value;
			}
		},
		methods: {
			update(value) {
				if(/[1-9]\d\d/.test(value) && value.length === 3)
					this.$emit('input', value);
			},
		},
	};
</script>

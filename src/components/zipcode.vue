<template>
	<input
		class="zipcode"
		style="width: calc((100% - 8px) / 3)"
		type="text"
		maxLength="3"
		v-model="val"
		:name="name"
		:placeholder="placeholder"
		:readonly="readonly"
		@input="update($event.target.value)"
	/>
</template>

<script>
	export default {
		props: {
			className: String,
			name: { type: String, default: 'zipcode' },
			placeholder: String,
			value: String,
			readonly: [ String, Boolean ]
		},
		computed: {
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

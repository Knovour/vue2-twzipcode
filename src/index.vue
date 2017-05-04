<template>
	<div :style="style">
		<zipcode
			v-model="zipcode"
			:class="classNames.zipcode"
			:name="names.zipcode"
			:readonly="!withoutFocus">
		</zipcode>
		<county
			:class="classNames.county"
			:name="names.county"
			:value="county"
			:counties="counties"
			@change="county = $event">
		</county>
		<district
			:class="classNames.district"
			:name="names.district"
			:value="district"
			:districts="districtList"
			@change="district = $event">
		</district>
	</div>
</template>

<script>
	import Zipcode  from './components/zipcode.vue';
	import County   from './components/county.vue';
	import District from './components/district.vue';

	import addrData from './data.js';

	export default {
		data() {
			return {
				zipcode: '',
				county: '',
				district: '',
				style: {
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap'
				}
			};
		},
		props: {
			names: {
				type: Object,
				default: value =>
					Object.assign({
						county: 'county',
						district: 'district',
						zipcode: 'zipcode',
					}, value)
			},
			classNames: {
				type: Object,
				default: value =>
					Object.assign({
						county: '',
						district: '',
						zipcode: '',
					}, value)
			},
			focus: Object,
			defaultCounty: { type: String, default: Object.keys(addrData)[0] },
			defaultDistrict: String,
			defaultZipcode: [ Number, String ],
		},
		created() {
			if(this.defaultZipcode)
				return this.setCountyAndDistrictFromZipcode(this.defaultZipcode);

			this.county = this.defaultCounty;
			this.defaultDistrict
				? this.district = this.defaultDistrict
				: this.resetDistrict();
		},
		computed: {
			withoutFocus() {
				return !this.focus || !Object.keys(this.focus).length;
			},
			counties() {
				return this.withoutFocus
					? Object.keys(addrData)
					: Object.keys(addrData).filter(county => Object.keys(this.focus).includes(county));
			},
			districtList() {
				switch(true) {
					case !this.county: return [];
					case this.withoutFocus: return Object.keys(addrData[this.county]);
					default: {
						const districtList = Object.keys(addrData[this.county]);
						const focusDistricts = this.focus[this.county];

						return !focusDistricts.length
							? districtList
							: districtList.filter(district => focusDistricts.includes(district));
					}
				}
			}
		},
		methods: {
			setCountyAndDistrictFromZipcode(defaultZipcode = '') {
				Object
					.keys(addrData)
					.some(county =>
						Object
							.keys(addrData[county])
							.some(district => {
								const isMatched = addrData[county][district] === defaultZipcode;
								if(isMatched) {
									this.county = county;
									this.district = district;
								}

								return isMatched;
							})
					);
			},
			resetDistrict(county = this.county) {
				if(!this.districtList.includes(this.district))
					this.district = this.districtList[0];
			},
			dispatchUpdate() {
				const { zipcode, county, district } = this;
				this.$emit('update', { zipcode, county, district });
			}
		},
		watch: {
			zipcode(val) {
				this.setCountyAndDistrictFromZipcode(val);
				this.dispatchUpdate();
			},
			county(val) {
				this.resetDistrict(val);
				this.dispatchUpdate();
			},
			district(val) {
				this.zipcode = addrData[this.county][val];
				this.dispatchUpdate();
			},
		},
		components: {
			Zipcode,
			County,
			District,
		},
	};
</script>

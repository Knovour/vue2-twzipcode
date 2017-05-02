<template>
	<div :style="style">
		<zipcode :class="classNames.zipcode" :name="names.zipcode" v-model="zipcode" :readonly="this.lockCounty"></zipcode>
		<county :class="classNames.county" :name="names.county" :value="county" :counties="counties" @change="county = $event"></county>
		<district :class="classNames.district" :name="names.district" :value="district" :districts="districts" @change="district = $event"></district>
	</div>
</template>

<script>
	import Zipcode  from './components/zipcode.vue';
	import County   from './components/county.vue';
	import District from './components/district.vue';

	import Data from './data.js';

	export default {
		data() {
			return {
				zipcode: '',
				county: '',
				district: ''
			};
		},
		props: {
			names: {
				type: Object,
				default(value) {
					return Object.assign({
						county: 'county',
						district: 'district',
						zipcode: 'zipcode',
					}, value);
				},
			},
			classNames: {
				type: Object,
				default(value) {
					return Object.assign({
						county: '',
						district: '',
						zipcode: '',
					}, value);
				}
			},
			lockCounty: [ String, Boolean ],
			defaultCounty: { type: String, default: Object.keys(Data)[0] },
			defaultDistrict: String,
			defaultZipcode: [ Number, String ],
		},
		computed: {
			counties() {
				return this.lockCounty ? [ this.defaultCounty ] : Object.keys(Data);
			},
			districts() {
				return this.county ? Object.keys(Data[this.county]) : [];
			},
			style() {
				return {
					display: 'flex',
					justifyContent: 'space-between',
					flexWrap: 'wrap'
				}
			}
		},
		methods: {
			setCountyAndDistrictFromZipcode(defaultZipcode) {
				Object
					.keys(Data)
					.some(county => {
						const districtList = Data[county];
						Object
							.keys(districtList)
							.some(district => {
								const zipcode = districtList[district];
								if(zipcode === defaultZipcode.toString()) {
									this.county = county;
									this.district = district;

									return true;
								}

								return false;
							});
					});
			},
			resetDistrict(county = this.county) {
				const current = Object.keys(Data[county]);
				if(!current.includes(this.district))
					this.district = current[0];
			},
			dispatchUpdate() {
				const { zipcode, county, district } = this;
				this.$emit('update', { zipcode, county, district });
			}
		},
		created() {
			if(this.defaultZipcode) {
				this.setCountyAndDistrictFromZipcode(this.defaultZipcode);
				return;
			}

			this.county = this.defaultCounty;
			if(this.defaultDistrict)
				this.district = this.defaultDistrict;
			else
				this.resetDistrict();
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
				this.zipcode = Data[this.county][val];
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

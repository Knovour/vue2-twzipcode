<template>
	<div :style="style">
		<zipcode  :class-name="classNames.zipcode"  :name="names.zipcode"  v-model="zipcode"></zipcode>
		<county   :class-name="classNames.county"   :name="names.county"   v-model.lazy="county"   :counties="counties"></county>
		<district :class-name="classNames.district" :name="names.district" v-model.lazy="district" :districts="districts"></district>
	</div>
</template>

<script>
	import Zipcode  from './components/zipcode';
	import County   from './components/county';
	import District from './components/district';

	import Data from './data';

	export default {
		data() {
			return {
				zipcode: '',
				county: '',
				district: '',
				counties: Object.keys(Data),
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
			defaultCounty:   { type: String, default: Object.keys(Data)[0] },
			defaultDistrict: { type: String },
			defaultZipcode:  { type: [ Number, String ] },
		},
		computed: {
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
			zipcode(code) {
				this.setCountyAndDistrictFromZipcode(code);
				this.dispatchUpdate();
			},
			county(county) {
				this.resetDistrict(county);
				this.dispatchUpdate();
			},
			district(district) {
				this.zipcode = Data[this.county][district];
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

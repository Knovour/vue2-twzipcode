import Vue from 'vue';
import Twzipcode from './index.vue';

new Vue({
	el: '#app',
	template: `<twzipcode :class-names="classes" :focus="focus"></twzipcode>`,
	data() {
		return {
			classes: {
				county: 'form-control',
				district: 'form-control',
				zipcode: 'form-control'
			},
			focus: { '台北市': [ '松山區', '大同區' ] }
		}
	},
	components: {
		Twzipcode
	}
});

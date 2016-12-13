# Vue-TWzipcode

Rewrite [jQuery-TWzipcode](https://github.com/essoduke/jQuery-TWzipcode) in Vue2

This Repo was refactored from [CasperLaiTW].

## Screenshot
![pic](/screenshots/screenshot.png)

## Example

Not yet, but you can see [Vue 1 example] by [CasperLaiTW].

[Vue 1 example]: https://casperlaitw.github.io/vue-twzipcode/
[CasperLaiTW]: https://github.com/CasperLaiTW/vue-twzipcode

## Installation
```
$ yarn add vue2-twzipcode
```

## Usage

``` vue
<template>
  <twzipcode
    :class-names="{county: 'form-control', district: 'form-control', zipcode: 'form-control'}"
    default-zipcode="403"
    ref="twzipcode"
    @update="result"
  >
  </twzipcode>
</template>

<script>
  import Twzipcode from 'vue2-twzipcode';

  export default {
    methods: {
      result({ zipcode, county, district }) {
        console.log(zipcode, county, district);
      }
    },
    components: {
      Twzipcode
    },
  };
</script>
```


### Get Values

If you don't want to use event binding, you can just use `refs` instead.

``` javascript
const {county, district, zipcode } = app.$refs.twzipcode;

console.log(county, district, zipcode);  // 台中市, 西區, 403
```

## Props
| Prop            | Type   | Default                                 | Example                                                                     |
|-----------------|--------|-----------------------------------------|-----------------------------------------------------------------------------|
| names           | Object | `{county: 'county', district: 'district', zipcode: 'zipcode'}` | `{county: 'my-county', district: 'my-district', zipcode: 'my-zipcode'}`       |
| classNames      | Object | `{county: '', district: '', zipcode: ''}`                      | `{county: 'form-control', district: 'form-control', zipcode: 'form-control'}` |
| defaultCounty   | String | '基隆市'                                                      | `default-county="台中市"`                                                                           |
| defaultDistrict | String | ''                                                             | `default-district="西區"`                                                                      |
| defaultZipcode  | String | ''                                                             | `default-zipcode="403"`                                                                        |

1. *Using props to component, notice `kebab-case`*
2. **defaultZipcode** is `highest` priority than defaultCounty and defaultDistrict. So if you using both, will be `ignored` defaultCounty and defaultDistrict props.


## Contributing
All contributions (in the form on pull requests, issues and feature-requests) are welcome.

## License
Licenced under the MIT License (MIT). Please see the [license file](LICENSE.md) for more information.

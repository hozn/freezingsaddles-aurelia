import numeral from 'numeral';

export class BigNumberValueConverter {
  toView(value) {
    return numeral(value).format('0,0');
  }
}

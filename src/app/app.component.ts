import { Component } from '@angular/core';
import { CountrySelection, Data } from '../types';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  data: Data = {
    Germany: 'Berlin',
    Azerbaijan: 'Baku',
  };
  userSelection: CountrySelection = {
    country: '',
    capital: '',
    filterData: [],
  };
  entriesValue = Object.entries(this.data);
  countryList: Data;

  updateUserSelection(values) {
    this.userSelection = { ...this.userSelection, ...values };
  }

  getFilterData(val1, val2) {
    let filter = [];
    if (val1) {
      filter = this.entriesValue?.filter(
        ([key, _]) => key.toLowerCase() === val1.toLowerCase()
      );
    } else {
      filter = this.entriesValue?.filter(
        ([_, val]) => val.toLowerCase() === val2.toLowerCase()
      );
    }
    const find = filter.find((it) => it);
    this.updateUserSelection({ filterData: find });
  }

  setCountriesList(data): void {
    this.countryList = data;
  }

  shuffleData(values): void {
    const shuffleObjectKeys = Object.keys(values).sort(
      () => Math.random() - 0.5
    );
    const shuffleObjectValues = Object.values(values).sort(
      () => Math.random() - 0.5
    );
    const newArr = shuffleObjectKeys.map((ele, index) => ({
      [ele]: shuffleObjectValues[index],
    }));
    const newEntries = Object.assign({}, ...newArr);
    this.setCountriesList(Object.entries(newEntries));
  }

  checkForMatch(val1, val2): void {
    const selectedCountry = this.userSelection.country
      ? this.userSelection.country
      : val1;
    const selectedCapital = this.userSelection.capital
      ? this.userSelection.capital
      : val2;
    if (
      this.userSelection.filterData[0]?.toLowerCase() ===
        selectedCountry?.toLowerCase() &&
      this.userSelection.filterData[1]?.toLowerCase() ===
        selectedCapital?.toLowerCase()
    ) {
      const removeSelected = this.entriesValue.filter(
        ([key, _]) => key.toLowerCase() !== selectedCountry.toLowerCase()
      );
      this.updateUserSelection({ country: '', capital: '' });
      this.entriesValue = removeSelected;
      this.shuffleData(Object.fromEntries(removeSelected));
    } else if (val1) {
      this.updateUserSelection({ country: val1 });
    } else if (val2) {
      this.updateUserSelection({ capital: val2 });
    }
  }

  selectCountry(val1, val2): void {
    if (val1) {
      this.updateUserSelection({ country: val1 });
      this.getFilterData(val1, null);
    } else if (val2) {
      this.updateUserSelection({ capital: val2 });
      this.getFilterData(null, val2);
    }
    this.checkForMatch(val1, val2);
  }

  constructor() {
    this.shuffleData(this.data);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

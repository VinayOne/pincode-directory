import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterResult'
})
export class FilterResultPipe implements PipeTransform {

  transform(data: Array<any>, searchTxt: string): Array<any> {
    return data.filter(getData);
    function getData(value: any, index: number) {
      if (
        value.VillageLocality.toLowerCase().indexOf(searchTxt.toLowerCase()) > -1 || value.PostOffice.toLowerCase().indexOf(searchTxt.toLowerCase()) > -1 || value.SubDistrict.toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
      ) {
        return data[index];
      }

    };
  }

}

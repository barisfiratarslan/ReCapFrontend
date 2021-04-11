import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'brandAndColorPipe'
})
export class BrandAndColorPipePipe implements PipeTransform {

  transform(value: CarDetail[], colorName:string, brandName:string): CarDetail[] {
    if(colorName == "-1" && brandName == "-1"){
      return value
    }else if(colorName === "-1"){
      brandName = brandName?brandName.toLocaleLowerCase():"";
      return brandName?value.filter((c:CarDetail)=>c.brandName.toLocaleLowerCase().indexOf(brandName)!==-1):value;
    }else if(brandName === "-1"){
      colorName = colorName?colorName.toLocaleLowerCase():"";
      return colorName?value.filter((c:CarDetail)=>c.colorName.toLocaleLowerCase().indexOf(colorName)!==-1):value;
    }else{
      brandName = brandName?brandName.toLocaleLowerCase():"";
      colorName = colorName?colorName.toLocaleLowerCase():"";
      return colorName?value.filter((c:CarDetail)=>c.colorName.toLocaleLowerCase().indexOf(colorName)!==-1 && c.brandName.toLocaleLowerCase().indexOf(brandName)!==-1):value;
    }   
  }

}

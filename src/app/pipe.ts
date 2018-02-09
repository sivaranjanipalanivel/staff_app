import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
  colors: any;
  transform(value: string, args: string[]): any {
    this.colors = [
      'F44336',
      'E91E63',
      '9C27B0',
      '673AB7',
      '3F51B5',
      '2196F3',
      '03A9F4',
      '00BCD4',
      '009688',
      '4CAF50',
      '8BC34A',
      'CDDC39',
      'FFEB3B',
      'FFC107',
      'FF9800',
      'FF5722',
      '795548'
    ]
    if (value) return this.colors[Math.floor((Math.random() * 16) + 1)];
  }
}

@Pipe({ name: 'color' })
export class ColorPipe implements PipeTransform {
  colors: any;
  transform(value: string, args: string[]): any {
    this.colors = [
      'EF5350',
      'EC407A',
      'AB47BC',
      '7E57C2',
      '5C6BC0',
      '42A5F5',
      '29B6F6',
      '26C6DA',
      '26A69A',
      '66BB6A',
      '9CCC65',
      'D4E157',
      'FFEE58',
      'FFCA28',
      'FFA726',
      'FF7043',
      '78909C'
    ]
    if (value) return this.colors[Math.floor((Math.random() * 16) + 1)];
  }
}

// @Pipe({ name: 'firstLetter' })
// export class ExponentialStrengthPipe implements PipeTransform {
//     transform(value: string, letter: string): string {
//         if (!value || !letter) return value;
//         return value.charAt(0).indexOf(letter) > -1 ? value : "";
//     }
// }
// @Pipe({name: 'groupBy'})
// export class GroupByPipe implements PipeTransform {
//   transform(value: Array<any>, field: string): Array<any> {
//     const groupedObj = value.reduce((prev, cur)=> {
//       if(!prev[cur[field]]) {
//         prev[cur[field]] = [cur];
//       } else {
//         prev[cur[field]].push(cur);
//       }
//       return prev;
//     }, {});
//     return Object.keys(groupedObj).map(key => ({ key, value: groupedObj[key] }));
//   }
// }

@Pipe({ name: 'lettrtcolor' })
export class CPipe implements PipeTransform {
  colors: any;
  transform(value: string, args: string[]): any {
    this.colors = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'a'
    ]
    if (value) return this.colors[Math.floor((Math.random() * 5) + 1)];
  }
}
@Pipe({ name: 'staffname' })
export class staffnamePipe implements PipeTransform {
  list: any;
  transform(value: any, args: string[]): any {
    if(localStorage.staff_list){
      this.list = JSON.parse(localStorage.staff_list);
      // console.log(this.list);
      if (value)
       for (var index = 0; index < this.list.length; index++) {
         var element = this.list[index];
         if (element.staffid == value) {
          return element.firstname
        }
       }
    }

  }
}

@Pipe({ name: 'batchnamename' })
export class batchnamePipe implements PipeTransform {
  list: any;
  transform(value: any, args: string[]): any {
    if(localStorage.batches_list){
      this.list = JSON.parse(localStorage.batches_list);
      // console.log(this.list);
      if (value)
       for (var index = 0; index < this.list.length; index++) {
         var element = this.list[index];
         if (element.id == value) {
          return element.name
        }
       }
    }

  }
}

@Pipe({ name: 'lettrcricle' })
export class lettrcriclePipe implements PipeTransform {
  colors: any;
  transform(value: string, args: string[]): any {
    this.colors = [
      'ionic',
      'angular',
      'communication',
      'tooling',
      'services',
      'design',
      'workshop',
      'food',
      'documentation',
      'navigation'
    ]
    if (value) return this.colors[Math.floor((Math.random() * 5) + 1)];
  }
}





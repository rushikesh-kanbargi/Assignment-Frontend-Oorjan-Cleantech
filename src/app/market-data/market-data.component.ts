import { Component, OnInit } from '@angular/core';
import { MarketDataService } from '../services/market-data.service';

@Component({
  selector: 'app-market-data',
  templateUrl: './market-data.component.html',
  styleUrls: ['./market-data.component.css']
})
export class MarketDataComponent implements OnInit {
  marketData: any[] = [];
  priceList: any[] = [];
  currentIndex = 0;
  pageNumber = 1;

  constructor(private marketDataService: MarketDataService) {}

/* The ngOnInit function retrieves market data, assigns it to variables, and updates colors.*/
  ngOnInit(): void {
    this.marketDataService.getMarketData().subscribe((data: any) => {
      this.marketData = data.data;
      this.priceList = this.marketData.reverse();
      this.updateColors();
    });
  }

  /* Updates the current index, retrieves a subset of data from an array,
  * updates colors, and increments the page number if there is more data available.*/
  nextPage() {
    if (this.currentIndex + 7 < this.marketData.length) {
      this.currentIndex += 7;
      this.priceList = this.marketData.slice(this.currentIndex, this.currentIndex + 7);
      this.updateColors();
      this.pageNumber += 1;
    }
  }

  /* The function "previousPage" is used to navigate to the previous page of a price list, updating the
   * current index, price list, colors, and page number accordingly.*/
  previousPage() {
    if (this.currentIndex - 7 >= 0) {
      this.currentIndex -= 7;
      this.priceList = this.marketData.slice(this.currentIndex, this.currentIndex + 7);
      this.updateColors();
      this.pageNumber -= 1;
    }
  }

  /* The code block is iterating over each element in the `priceList` array using the `forEach` method. For each element, it checks if the index is greater than 0. If it is, it compares the
  opening price of the current day with the closing price of the previous day. Based on the comparison, it assigns a color */
  updateColors() {
    this.priceList.forEach((day, index) => {

      if (index > 0) {
        const openingPrice = day.open;
        const closingPrice = day.close;
        const previousDay = this.priceList[index - 1];
        const previousClosingPrice = previousDay.close;

        day.openColor = openingPrice > previousClosingPrice ? 'green' : openingPrice < previousClosingPrice ? 'red' : 'black';
        day.closeColor = closingPrice > openingPrice ? 'green' : closingPrice < openingPrice ? 'red' : 'black';
      }
      else {
        const openingPrice = day.open;
        const closingPrice = day.close;
        day.closeColor = closingPrice > openingPrice ? 'green' : closingPrice < openingPrice ? 'red' : 'black';
      }
    });
  }
}

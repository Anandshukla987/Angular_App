import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductOrderComponent } from './product-order/product-order.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductOrderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Product_List_App';
}

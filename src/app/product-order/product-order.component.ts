import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextToSpeechService } from './text-to-speech.service'; // Adjust the path as necessary

interface ProductOrder {
  productName: string;
  quantity: number | null;
  disabled: boolean;
}

@Component({
  selector: 'app-product-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [TextToSpeechService],
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent {
  maxProducts: number = 8;
  products: string[] = ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'];
  quantities: number[] = [0, 1, 2, 3, 4, 5];
  productOrders: ProductOrder[] = [{ productName: '', quantity: null, disabled: false }];
  orderSubmitted: boolean = false;
  finalOrder: ProductOrder[] = [];

  constructor(private textToSpeechService: TextToSpeechService) {}

  addProductOrder(index: number) {
    if (this.productOrders.length < this.maxProducts) {
      if (this.productOrders[index].productName && this.productOrders[index].quantity !== null) {
        this.productOrders[index].disabled = true;
        if (index === this.productOrders.length - 1 && this.productOrders.length < this.maxProducts) {
          this.productOrders.push({ productName: '', quantity: null, disabled: false });
        }
      }
    }
  }

  showOrder() {
    this.finalOrder = this.productOrders.filter(order => order.productName && order.quantity !== null);
    this.orderSubmitted = true;
    this.readOrderOutLoud();
  }

  async readOrderOutLoud() {
    const orderText = this.finalOrder.map(order => `Product: ${order.productName}, Quantity: ${order.quantity}`).join('. ');
    try {
      const audioBlob = await this.textToSpeechService.getSpeech(orderText);
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  }
}

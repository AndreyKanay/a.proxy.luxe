import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { User } from '../users/users.entity';
import { Product } from '../product/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaymentGateway, PaymentStatus } from './order.entity';
import { PaymentOrderDto } from './dto/payment-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userRepository.findOneBy({
      id: createOrderDto.user_id,
    });
    const product = await this.productRepository.findOneBy({
      id: createOrderDto.product_id,
    });

    if (!user || !product) {
      throw new NotFoundException('User or Product not found');
    }

    const totalPrice =
      product.price * createOrderDto.quantity * createOrderDto.period_days;

    return this.orderRepository.save({
      ...createOrderDto,
      user,
      product,
      total_price: totalPrice,
    });
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user', 'product'],
    });
  }

  async processPayment(paymentDto: PaymentOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOneBy({
      id: paymentDto.order_id,
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.status !== PaymentStatus.PENDING) {
      throw new BadRequestException('Order already processed');
    }

    // Заглушка для интеграции с платежными системами
    const paymentSuccess = this.mockPaymentGateway(paymentDto.gateway);

    if (paymentSuccess) {
      order.status = PaymentStatus.PAID;
    } else {
      order.status = PaymentStatus.CANCELED;
    }

    return this.orderRepository.save(order);
  }

  private mockPaymentGateway(gateway: PaymentGateway): boolean {
    // Реальная интеграция с платежными шлюзами
    console.log(`Processing payment via ${gateway}`);
    return true; // Всегда успешная оплата для примера
  }
}

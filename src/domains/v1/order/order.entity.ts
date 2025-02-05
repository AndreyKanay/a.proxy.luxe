import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Product } from '../product/product.entity';

export enum ProxyType {
  HTTP = 'http',
  SOCKS5 = 'socks5',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CANCELED = 'canceled',
}

export enum PaymentGateway {
  CARD = 'card',
  WMZ = 'wmz',
  BTC = 'btc',
  LTC = 'ltc',
  DOGE = 'doge',
  QIWI = 'qiwi',
  PAYEER = 'payeer',
  ENOT = 'enot.io',
  PERFECT_MONEY = 'perfect_money',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  country: string;

  @Column('int')
  quantity: number;

  @Column('int')
  period_days: number;

  @Column({
    type: 'enum',
    enum: ProxyType,
    default: ProxyType.HTTP,
  })
  proxy_type: ProxyType;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

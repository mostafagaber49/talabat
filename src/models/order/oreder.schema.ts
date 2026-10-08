import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

import { OrderStatus } from 'src/common/enum/order.status.enum';
import { PaymentMethod } from 'src/common/enum/payment.method.enum';

@Schema({ _id: false })
export class OrderItem {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  })
  productId!: Types.ObjectId;

  @Prop({ type: String })
  productName!: string;

  @Prop({ type: Number })
  productPrice!: number;

  @Prop({ type: Number })
  productDiscount!: number;

  @Prop({ type: Number })
  productFinalPrice!: number;

  @Prop({ type: Number })
  subtotal!: number;

  @Prop({ type: Number })
  quantity!: number;
}

@Schema({ timestamps: true })
export class Order {
  _id!: Types.ObjectId;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  orderId!: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Adress',
  })
  adressId!: Types.ObjectId;

  @Prop({
    type: String,
    enum: PaymentMethod,
    required: true,
  })
  paymentMethod!: PaymentMethod;

  @Prop({ type: String })
  invoiceLink?: string;

  @Prop({
    type: [OrderItem],
  })
  orderItems!: OrderItem[];

  @Prop({ type: Number })
  subTotal!: number;

  @Prop({ type: Number })
  fees!: number;

  @Prop({ type: Number })
  total!: number;

  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.pending,
  })
  status!: OrderStatus;
}

export type iOrder = Order & Document;

export const orderschema = SchemaFactory.createForClass(Order);
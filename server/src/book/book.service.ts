import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { bookDTO } from './dto/book.dto';
import { statusDTO } from './dto/status.dto';
import { Book } from './schema/book.schema';

@Injectable()
export class BookService {
  private readonly books: Book[] = [];
  constructor(
    @InjectModel('Book') private readonly bookModel: Model<Book>,
  ) {}
  async getAll(): Promise<Book[]>{
    return await this.bookModel.find();
  }
  async getBookByID(_id: string): Promise<Book>{
    return await this.bookModel.findOne({_id});
  }
  async createBook(bookdto: bookDTO): Promise<any>{
    const newBook = new this.bookModel(bookdto);
    return await newBook.save();
  }
  async updateBook(_id: string, bookdto: bookDTO): Promise<any>{
    return await this.bookModel.updateOne({_id}, {...bookdto});
  }
  async deleteBook(_id: string): Promise<any>{
    return await this.bookModel.deleteOne({_id});
  }
  async setStatusPublish(_id: string): Promise<any>{
    const {published} = await this.bookModel.findOne({_id});
    return await this.bookModel.updateOne({_id}, {published: !published});
  }
  async setStatusPublishMulti(_id: string, statusdto: statusDTO): Promise<any>{
    return await this.bookModel.updateOne({_id}, {published: statusdto.bool});
  }
  async searchBook(name: string): Promise<Book[]>{
    return await this.bookModel.find({name});
  }
}

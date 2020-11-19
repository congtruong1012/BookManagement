import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { bookDTO } from './dto/book.dto';
import { Book } from './mock/book.mock';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService){};

  @Get()
  getAll(): Promise<Book[]>{
    return this.bookService.getAll();
  }

  @Get(':_id')
  getBookByID(@Param('_id') _id: string): Promise<Book>{
    return this.bookService.getBookByID(_id);
  }

  @Post()
  createBook(@Body() bookdto: bookDTO): Promise<any>{
    return this.bookService.createBook(bookdto);
  }

  @Put(':_id')
  updateBook(@Param('_id') _id: string, @Body() bookdto: bookDTO): Promise<any>{
    return this.bookService.updateBook(_id, bookdto)
  }
  @Delete(':_id')
  deleteBook(@Param('_id') _id: string): Promise<any>{
    return this.bookService.deleteBook(_id);
  }
  @Patch(':_id')
  async setStatusPublish(@Param('_id') _id: string): Promise<any>{
    return this.bookService.setStatusPublish(_id);
  }
}
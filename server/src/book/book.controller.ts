import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { bookDTO } from './dto/book.dto';
import { statusDTO } from './dto/status.dto';
import { Book } from './mock/book.mock';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService){};

  @Get()
  getAll(@Query('name') name: string, @Query('skip') skip: number, @Query('limit') limit: number ): Promise<Book[]>{
    if(name){
      return this.bookService.searchBook(name, Number(skip), Number(limit));
    }else{
      return this.bookService.getAll(Number(skip), Number(limit));
    }
  }
  @Get('count')
  async countAll(@Query('name') name: string): Promise<Number> {
    if(name){
      return this.bookService.countSearcBook(name);
    }
    else{
      return await this.bookService.countAll();
    }
  }

  @Get(':_id')
  getBookByID(@Param('_id') _id: string): Promise<Book>{
    return this.bookService.getBookByID(_id);
  }

  @UsePipes(ValidationPipe)
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
  setStatusPublish(@Param('_id') _id: string ): Promise<any>{
    return this.bookService.setStatusPublish(_id);
  }
  @Patch('status/:_id')
  setStatusPublishMulti(@Param('_id') _id: string,  @Body() statusdto: statusDTO ): Promise<any>{
    return this.bookService.setStatusPublishMulti(_id, statusdto);
  }
}

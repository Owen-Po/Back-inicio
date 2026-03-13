import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

/**
 * @Injectable() es un decorador que marca la clase como un proveedor (provider)
 * en NestJS. Esto significa que puede ser inyectado en otras clases (como controladores)
 * mediante el sistema de inyección de dependencias de NestJS.
 */
@Injectable()
export class ProductsService {
  /**
   * Logger se utiliza para mostrar mensajes en la consola de manera estructurada,
   * útil para debugear y monitorear errores en producción.
   */
  private readonly logger = new Logger('ProductsService');

  constructor(
    /**
     * @InjectRepository(Product) inyecta el repositorio de TypeORM para la entidad Product.
     * Esto nos permite interactuar con la base de datos (crear, buscar, actualizar, eliminar)
     * utilizando los métodos que TypeORM ya nos provee.
     */
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) { }

  /**
   * Crea un nuevo producto en la base de datos.
   * @param createProductDto Datos del producto a crear (validados previamente).
   */
  async create(createProductDto: CreateProductDto) {
    try {
      // 1. Crea la instancia del producto con los datos recibidos (esto no guarda en BDD aún)
      const product = this.productsRepository.create(createProductDto);

      // 2. Guarda el producto en la base de datos
      await this.productsRepository.save(product);

      // 3. Retorna el producto creado
      return product;
    } catch (error) {
      // Manejador centralizado de errores para evitar repetir lógica en cada método
      this.handleExceptions(error);
    }
  }

  /**
   * Retorna todos los productos.
   */
  findAll() {
    return this.productsRepository.find({});
  }

  /**
   * Busca un producto por su id.
   */
  async findOne(id: string) {

    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return this.productsRepository.findOneBy({ id });  /// estamos retornando el constructpr ('el repositorio de arriba') 
  }

  /**
   * Actualiza un producto existente.
   */
  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  /**
   * Elimina un producto.
   */
  async remove(id: string) {

    const product = await this.productsRepository.findOneBy({ id });
    await this.productsRepository.remove(product);
    return product;
  }

  /**
   * Método privado para manejar errores de base de datos de forma centralizada.
   * Ayuda a mantener los métodos de la clase más limpios.
   */
  private handleExceptions(error: any) {
    this.logger.error(error);
    // Aquí puedes agregar lógica para manejar errores específicos (ej. códigos de Postgres)
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
}

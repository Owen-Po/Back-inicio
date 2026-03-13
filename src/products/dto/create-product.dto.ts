import { IsArray, IsIn, isIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";


export class CreateProductDto {


    @IsString()
    @MinLength(1)
    title: string;
    /*Escribimos el signo de interrogacion porque es opcional es decir si el 
    cliente no manda el titulo lo creara automaticamente */
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @IsString()
    @IsOptional()
    description?: string;


    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @IsString({ each: true })  //esto sirve para que cada elemento del array sea un string
    @IsArray()
    sizes?: string[];


    @IsString()
    @IsOptional()
    slug?: string;

    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender: string;
}



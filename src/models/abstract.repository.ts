import {Model, ProjectionType, QueryFilter, QueryOptions, UpdateQuery} from "mongoose"
export class abstractRepository<T>{

constructor(private _model : Model<T>){}

get model(){

    return this._model
}

public async create(item: Partial<T>){

    const doc = new this._model(item)
    return doc.save()
} 

public async getOne(
    filter: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?:QueryOptions ){

    return this._model.findOne(filter,projection,options)
}

public async getAll(
    filter: QueryFilter<T>,
    projection?: ProjectionType<T>,
    options?:QueryOptions ){

    return this._model.find(filter,projection,options)
}

public async updateOne(
    filter: QueryFilter<T>,
    update: UpdateQuery<T>,
    options?: QueryOptions){

    return this._model.findByIdAndUpdate(filter,update,options)
}

public async delete(filter: QueryFilter<T>){

    return this._model.deleteOne(filter)
}


}
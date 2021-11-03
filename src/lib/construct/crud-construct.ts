import { Construct } from '@aws-cdk/core';
import { Function, AssetCode, Runtime } from '@aws-cdk/aws-lambda';
import { Table } from '@aws-cdk/aws-dynamodb';
import { Role } from '@aws-cdk/aws-iam';

export interface CRUDConstructProps {
    table: Table,
    tableRole: Role;
}
export class CRUDConstruct extends Construct {
    public readonly getOne: Function;
    public readonly getAll: Function;
    public readonly createOne: Function;
    public readonly updateOne: Function;
    public readonly deleteOne: Function;

    constructor(scope: Construct, id: string, props: CRUDConstructProps) {
        super(scope, id);

        this.getOne = new Function(this, 'getOneItemFunction', {
            code: new AssetCode('src/lambdas/get-one/'),
            handler: 'get-one.handler',
            runtime: Runtime.NODEJS_14_X,
            environment: {
                TABLE_NAME: props.table.tableName,
                PRIMARY_KEY: 'itemId'
            },
            role: props.tableRole
        });

        this.getAll = new Function(this, 'getAllItemsFunction', {
            code: new AssetCode('src/lambdas/get-all'),
            handler: 'get-all.handler',
            runtime: Runtime.NODEJS_14_X,
            environment: {
                TABLE_NAME: props.table.tableName,
                PRIMARY_KEY: 'itemId'
            },
            role: props.tableRole
        });

        this.createOne = new Function(this, 'createItemFunction', {
            code: new AssetCode('src/lambdas/create'),
            handler: 'create.handler',
            runtime: Runtime.NODEJS_14_X,
            environment: {
                TABLE_NAME: props.table.tableName,
                PRIMARY_KEY: 'itemId'
            },
            role: props.tableRole
        });

        this.updateOne = new Function(this, 'updateItemFunction', {
            code: new AssetCode('src/lambdas/update'),
            handler: 'update-one.handler',
            runtime: Runtime.NODEJS_14_X,
            environment: {
                TABLE_NAME: props.table.tableName,
                PRIMARY_KEY: 'itemId'
            },
            role: props.tableRole
        });

        this.deleteOne = new Function(this, 'deleteItemFunction', {
            code: new AssetCode('src/lambdas/delete'),
            handler: 'delete-one.handler',
            runtime: Runtime.NODEJS_14_X,
            environment: {
                TABLE_NAME: props.table.tableName,
                PRIMARY_KEY: 'itemId'
            },
            role: props.tableRole
        });
    }
}
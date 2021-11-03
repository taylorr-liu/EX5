import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Role, ServicePrincipal, ManagedPolicy, PolicyDocument } from '@aws-cdk/aws-iam';
import { CRUDConstruct } from './construct/crud-construct';
import { ItemTable } from './construct/db.construct';
import { ItemsAPI } from './construct/api-construct';

export class CrudConstructAppStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const table = new ItemTable(this, 'ItemTable', {
            tableName: 'items',
            primaryKeyName: 'itemId'
        });

        const role = new Role(this, 'nRole', {
            roleName: `nRole`,
            assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
            managedPolicies: [
                ManagedPolicy.fromAwsManagedPolicyName(
                    'AWSLambdasBasicExecutionRole')
            ],
            inlinePolicies: {
                'dbAccess': new PolicyDocument({
                    statements: [table.getAccessPolicy()]
                })
            }
        });

        const crudConstruct = new CRUDConstruct(this, 'CRUDConstruct', {
            table: table,
            tableRole: role
        });

        const itemsAPI = new ItemsAPI(this, 'APIConstruct', {
            restApiName: 'Items Service',
            generalLambdaFunctions: {
                GET: crudConstruct.getAll,
                POST: crudConstruct.createOne
            },
            specificLambdaFunctions: {
                GET: crudConstruct.getOne,
                PUT: crudConstruct.updateOne,
                DELETE: crudConstruct.deleteOne
            }
        });
    }
}
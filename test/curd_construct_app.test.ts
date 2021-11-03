import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CurdConstructApp from '../lib/curd_construct_app-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CurdConstructApp.CurdConstructAppStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT));
});

import {
    Controller,
    Get,
    Post,
    Delete,
    Patch,
    Put,
    Head,
    Custom,
} from '../src';
import { describe, expect, it } from 'bun:test';
import 'reflect-metadata';

export enum HttpMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    HEAD = 'HEAD',
}

describe('@Controller decorator test', () => {
    it('should properly init data', () => {
        @Controller()
        class Foo {}

        expect(Reflect.getMetadata('prefix', Foo)).toBeUndefined;
        expect(Reflect.getMetadata('routes', Foo)).toEqual([]);
    });

    it('should properly init data with prefix', () => {
        @Controller('/test')
        class Foo {}

        expect(Reflect.getMetadata('prefix', Foo)).toEqual('/test');
        expect(Reflect.getMetadata('routes', Foo)).toEqual([]);
    });
});

const decorators = [
    {
        name: 'Get',
        method: HttpMethods.GET,
        decorator: Get,
    },
    {
        name: 'Post',
        method: HttpMethods.POST,
        decorator: Post,
    },
    {
        name: 'Put',
        method: HttpMethods.PUT,
        decorator: Put,
    },
    {
        name: 'Delete',
        method: HttpMethods.DELETE,
        decorator: Delete,
    },
    {
        name: 'Patch',
        method: HttpMethods.PATCH,
        decorator: Patch,
    },
    {
        name: 'Head',
        method: HttpMethods.HEAD,
        decorator: Head,
    },
];

for (const { name, method, decorator } of decorators) {
    describe(`@${name} decorator test`, () => {
        it('should properly init data', () => {
            class Foo {
                @decorator('/test')
                test() {}
            }

            const routes = Reflect.getMetadata('routes', Foo);
            expect(routes).toEqual([
                {
                    method,
                    path: '/test',
                    methodName: 'test',
                    options: {
                        config: {
                            allowMeta: false,
                        },
                    },
                },
            ]);
        });
    });
}

describe('@Custom decorator test', () => {
    it('should properly init data', () => {
        class Foo {
            @Custom('M-SEARCH', '/test')
            test() {}
        }

        const routes = Reflect.getMetadata('routes', Foo);
        expect(routes).toEqual([
            {
                method: 'M-SEARCH',
                path: '/test',
                methodName: 'test',
                options: {
                    config: {
                        allowMeta: false,
                    },
                },
            },
        ]);
    });
});

import { Injectable } from '@nestjs/common';
import { Bucket, Cluster, Collection } from 'couchbase';
import * as couchbase from 'couchbase';

@Injectable()
export class CouchBaseAdapterService {
  private collection: Collection;

  async connectDb(): Promise<Cluster> {
    const clusterConnStr = 'couchbase://localhost';
    const username = 'Administrator';
    const password = 'new_pwd';

    try {
      const cluster = await couchbase.connect(clusterConnStr, {
        username: username,
        password: password,
      });

      return cluster;
    } catch (e) {
      return e;
    }
  }
}

import { knex, returnId } from '@gqlapp/database-server-ts';

interface File {
  name: string;
  type: string;
  path: string;
  size: number;
}

export default class Upload {
  public files() {
    return knex('upload').select('*');
  }

  public file(id: number) {
    return knex('upload')
      .select('*')
      .where({ id })
      .first();
  }

  public getFileInfo(id: number) {
    return knex
      .select('id', 'name', 'size', 'path')
      .from('upload')
      .where('id', '=', id)
      .first();
  }

  public saveFiles(files: [File]) {
    return returnId(knex('upload').insert(files));
  }

  public deleteFile(id: number) {
    return knex('upload')
      .where({ id })
      .del();
  }
}

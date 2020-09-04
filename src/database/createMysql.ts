import mysql from 'mysql';
import {mysqlConfig} from './config';

export default mysql.createConnection(mysqlConfig);
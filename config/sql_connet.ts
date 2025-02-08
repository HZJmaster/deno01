import { Client } from "https://deno.land/x/mysql@v2.12.1/mod.ts";

// 创建客户端
export const client = await new Client().connect({
  hostname: "localhost", // 数据库主机地址
  username: "root", // 数据库用户名
  password: "password", // 数据库密码
  db: "test_db", // 要连接的数据库名称
  port: 3306, // MySQL默认端口
});

// 执行查询
// const result = await client.query("SELECT * FROM users WHERE status = ?", [
//   "active",
// ]);

// 插入数据
// await client.execute("INSERT INTO users (name, email) VALUES (?, ?)", [
//   "John Doe",
//   "john@example.com",
// ]);

// 关闭连接
// await client.close();

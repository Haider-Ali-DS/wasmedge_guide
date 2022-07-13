import * as http from 'wasi_http';
import * as net from 'wasi_net';
import { TextDecoder } from 'util'


async function handle_client(cs, handler_req) {
  print('open:', cs.peer());
  let buffer = new http.Buffer();

  while (true) {
    try {
      let d = await cs.read();
      if (d == undefined || d.byteLength <= 0) {
        return;
      }
      buffer.append(d);
      let req = buffer.parseRequest();
      if (req instanceof http.WasiRequest) {
        handler_req(cs, req);
        break;
      }
    } catch (e) {
      print(e);
    }
  }
  print('close:', cs.peer());
}

function handler_req(cs, req) {
  print("version=", req.version);
  print("uri=", req.uri);
  print("method=", req.method);
  print("headers=", Object.keys(req.headers));
  print("body=", new TextDecoder().decode(req.body));

  let resp = new http.WasiResponse();
  let body = 'echo:' + new TextDecoder().decode(req.body);
  let r = resp.encode(body);
  cs.write(r);
}

async function server_start() {
  print('listen 8000 ...');
  try {
    let s = new net.WasiTcpServer(8000);
    for (var i = 0; i < 100; i++) {
      let cs = await s.accept();
      try {
        handle_client(cs, handler_req);
      } catch (e) {
        print('handle_client:', e);
      }
    }
  } catch (e) {
    print(e);
  }
}

server_start();

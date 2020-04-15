/*
0 - Obter um usuário
1 - Obter o número de telefone de um usuário através de seu ID
2 - Obter o enredeço do usuário pelo ID
*/
const util = require("util");
const obterEnderecoAsync = util.promisify(obterEndereco);

function obterUsuario() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        id: 1,
        nome: "Aladin",
        dataNascimento: new Date(),
      });
    }, 1000);
  });
}

function obterTelefone(idUsuario) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        telefone: "992168274",
        ddd: 64,
      });
    }, 2000);
  });
}

function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "Rua dos bobos",
      numero: 0,
    });
  }, 2000);
}

// 1° passo é adicionar a palavra async na função e ela automaticamente retornará uma promise
main();
async function main() {
  try {
    console.time("Medida-promise");
    const usuario = await obterUsuario();
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id),
    ]);
    const endereco = resultado[1];
    const telefone = resultado[0];

    console.log(`
      Nome: ${usuario.nome},
      Telefone: (${telefone.ddd}) ${telefone.telefone}
      Endereço: ${endereco.rua}, ${endereco.numero}
    `);
    console.timeEnd("Medida-promise");
  } catch (error) {
    console.log("Deu ruim", error);
  }
}
//const usuarioPromise = obterUsuario();
//usuarioPromise
//  .then((usuario) =>
//    obterTelefone(usuario.id).then((result) => {
//      return {
//        usuario: {
//          nome: usuario.nome,
//          id: usuario.id,
//        },
//        telefone: result,
//      };
//    })
//  )
//  .then((resultado) => {
//    const endereco = obterEnderecoAsync(resultado.usuario.id);
//    return endereco.then((result) => {
//      return {
//        usuario: resultado.usuario,
//        telefone: resultado.telefone,
//        endereco: result,
//      };
//    });
//  })
//  .then((resultado) => {
//    console.log(
//      `
//    Nome: ${resultado.usuario.nome}
//    Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//    Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//    `
//    );
//  })
//  .catch((e) => console.log("Deu ruim: " + e));

/*obterUsuario(function resolverUsuario(error, usuario) {
  if (error) {
    console.error("DEU RUIM em USUÁRIO", error);
    return;
  }
  obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
    if (error1) {
      console.error("DEU RUIM em TELEFONE", error1);
      return;
    }
    obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
      if (error2) {
        console.error("DEU RUIM em ENDEREÇO", error2);
        return;
      }

      console.log(`
        Nome: ${usuario.nome}
        Endereço: ${endereco.rua}, número ${endereco.numero},
        Telefone: (${telefone.ddd}) ${telefone.telefone}
      `);
    });
  });
});
*/

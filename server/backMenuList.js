var backSqlMap = {
  mwAd: [{
      'authName': "用户管理",
      'children': [{
        'authName': "用户列表",
        'id': 101,
        'path': 'users'
      }],
      'id': 1,
      'path': 'userMa'
    },
    {
      'authName': "游记管理",
      'children': [{
        'authName': "游记列表",
        'id': 201,
        'path': 'searchNote'
      }],
      'id': 2,
      'path': 'NoteMa'
    }, {
      'authName': "问答管理",
      'children': [{
          'authName': "问题列表",
          'id': 301,
          'path': 'searchQA'
        },
        {
          'authName': "回答列表",
          'id': 302,
          'path': 'searchAnswer'
        }
      ],
      'id': 3,
      'path': 'QAMa'
    },
    {
      'authName': "管理员中心",
      'children': [{
        'authName': "修改密码",
        'id': 401,
        'path': 'setPwd'
      }, {
        'authName': "修改基本信息",
        'id': 402,
        'path': 'updateAdmin'
      }],
      'id': 4,
      'path': 'adCenter'
    },
  ],
  sysAd: [{
      'authName': "管理员管理",
      'children': [{
        'authName': "管理员列表",
        'id': 101,
        'path': 'AdminList'
      }],
      'id': 1,
      'path': 'AdminMa'
    },
    {
      'authName': "管理员中心",
      'children': [{
        'authName': "修改密码",
        'id': 201,
        'path': 'setPwd'
      }, {
        'authName': "修改基本信息",
        'id': 202,
        'path': 'updateAdmin'
      }],
      'id': 2,
      'path': 'adCenter'
    },
  ],
  rolesList: [{
      id: 1,
      roleName: '系统管理员',
    },
    {
      id: 2,
      roleName: '超级管理员',
    }
  ]
}
module.exports = backSqlMap;

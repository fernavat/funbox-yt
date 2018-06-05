import {
  Meteor
} from 'meteor/meteor';
import {
  Lists
} from '../../api/lists/lists.js';
import {
  Todos
} from '../../api/todos/todos.js';
import {
  Playlists
} from '../../api/playlists/playlists.js';
import {
  Videos
} from '../../api/videos/videos.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  const admin = Accounts.findUserByUsername('admin')
  if (!admin) {
    const userId = Accounts.createUser({
      username: 'admin',
      password: '6667'
    })
    Roles.addUsersToRoles(userId, ['admin'])
  }

  if (Lists.find().count() === 0) {
    const data = [{
      name: 'Meteor Principles',
      items: [
        'Data on the Wire',
        'One Language',
        'Database Everywhere',
        'Latency Compensation',
        'Full Stack Reactivity',
        'Embrace the Ecosystem',
        'Simplicity Equals Productivity',
      ],
    },
    {
      name: 'Languages',
      items: [
        'Lisp',
        'C',
        'C++',
        'Python',
        'Ruby',
        'JavaScript',
        'Scala',
        'Erlang',
        '6502 Assembly',
      ],
    },
    {
      name: 'Favorite Scientists',
      items: [
        'Ada Lovelace',
        'Grace Hopper',
        'Marie Curie',
        'Carl Friedrich Gauss',
        'Nikola Tesla',
        'Claude Shannon',
      ],
    },
    ];

    let timestamp = (new Date()).getTime();

    data.forEach((list) => {
      const listId = Lists.insert({
        name: list.name,
        incompleteCount: list.items.length,
      });

      list.items.forEach((text) => {
        Todos.insert({
          listId,
          text,
          createdAt: new Date(timestamp),
        });

        timestamp += 1; // ensure unique timestamp.
      });
    });
  }



});

Playlists.remove({})
Videos.remove({})
let timestamp = (new Date()).getTime();
//var myjson = {}
//var items = []
let playlistsJSON = [
  "Top Mexico",
  "Top US",
  'Top Latin',
  "Top Banda",
  "Top Norteña",
  "Top Reggaeton",
  "Luis Miguel",
  "Miguel Bose",
  "Vicente Fernandez"
]
for (let j in playlistsJSON) {
  let myjson = JSON.parse(Assets.getText(playlistsJSON[j] + ".json"));
  let items = []
  for (var i in myjson) {
    //console.log(i)
    Videos.insert({
      _id: myjson[i].contentDetails.videoId,
      title: myjson[i].snippet.title,
      thumbS: myjson[i].snippet.thumbnails.default.url,
      thumbM: myjson[i].snippet.thumbnails.medium.url,
      playlistCount: 1,
    })
    items.push(myjson[i].contentDetails.videoId)
  }
  Playlists.insert({
    name: playlistsJSON[j],
    items: items,
    itemsCount: items.length
  })
}

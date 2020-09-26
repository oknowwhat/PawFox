/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var cacheName = 'CSv2';

var cachedFiles = [

    '/assets/dist/plugins.min.css',
    '/assets/dist/plugins.min.js',
    '/assets/dist/style.min.css',
    '/assets/fonts/fontawesome-webfont.woff',
    '/assets/js/aos.js',
    '/assets/js/scripts.js',
    '/assets/js/theia-sidebar.min.js',
    '/assets/js/prism.min.js',



];

self.addEventListener('install', function(evt){
    console.log('Service Worker Install Event');
    //Add the file to the cache
    evt.waitUntil(
        caches.open(cacheName).then(function(cache){
            console.log('Caching Files');
            return cache.addAll(cachedFiles);
        }).then(function(){
            return self.skipWaiting();
        }).catch(function(err){
            console.log('Cache Failed', err);
        })
    );
});

self.addEventListener('activate', function(evt){
    console.log('Service Worker Activated');
    evt.waitUntil(
        caches.keys().then(function(keyList){
            return Promise.all(keyList.map(function(key){
                if(key !== cacheName){
                    console.log('Removing Old Cache', key);
                    return caches.delete(key)
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(evt){
    console.log('Fetch Event' + evt.request.url);
    evt.respondWith(
        caches.match(evt.request).then(function(response){
            return response || fetch(evt.request);
        })
    );
});
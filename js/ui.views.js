/*--------------------------*/
/* Views and view functions */
/*--------------------------*/

var uiviews = {};

(function($) {
	$.extend(uiviews, {
	
/*-------------------*/
/* Audio UI function */
/*-------------------*/

		/*---------*/
		ArtistAlbums: function(e) {
			// open new page to show artist's albums
			//console.log(e.data);
			var $artistContent = $('<div class="pageContentWrapper"></div>');
			var artistPage = mkf.pages.createTempPage(e.data.objParentPage, {
				title: e.data.strArtist,
				content: $artistContent
			});
			artistPage.setContextMenu(
				[
					{
						'icon':'close', 'title':mkf.lang.get('ctxt_btn_close_album_list'), 'shortcut':'Ctrl+1', 'onClick':
						function() {
							mkf.pages.closeTempPage(artistPage);
							return false;
						}
					}
				]
			);
			mkf.pages.showTempPage(artistPage);

			// show artist's albums
			$artistContent.addClass('loading');
			xbmc.getArtistsAlbums({
				artistid: e.data.idArtist,

				onError: function() {
					mkf.messageLog.show(mkf.lang.get('message_failed_artists_albums'), mkf.messageLog.status.error, 5000);
					$artistContent.removeClass('loading');
				},

				onSuccess: function(result) {
					$artistContent.defaultAlbumViewer(result, artistPage);
					$artistContent.removeClass('loading');
				}
			});

			return false;
		},
		
		/*---------*/
		GenreArtists: function(e) {
				// open new page to show artist's albums
				var $artistContent = $('<div class="pageContentWrapper"></div>');
				var artistPage = mkf.pages.createTempPage(e.data.objParentPage, {
					title: e.data.strGenre,
					content: $artistContent
				});
				artistPage.setContextMenu(
					[
						{
							'icon':'close', 'title':mkf.lang.get('ctxt_btn_close_album_list'), 'shortcut':'Ctrl+1', 'onClick':
							function() {
								mkf.pages.closeTempPage(artistPage);
								return false;
							}
						}
					]
				);
				mkf.pages.showTempPage(artistPage);

				// show genres artists
				$artistContent.addClass('loading');
				xbmc.getArtistsGenres({
					genreid: e.data.idGenre,

					onError: function() {
						mkf.messageLog.show(mkf.lang.get('message_failed_artists_list'), mkf.messageLog.status.error, 5000);
						$artistGenresContent.removeClass('loading');
					},

					onSuccess: function(result) {
						$artistContent.defaultArtistsViewer(result, artistPage);
						$artistContent.removeClass('loading');
					}
				});

				return false;
			},
		
		/*-----------*/
		AllGenreAlbums: function(e) {
			// open new page to show artist's albums
			var $artistsGenresContent = $('<div class="pageContentWrapper"></div>');
			var artistPage = mkf.pages.createTempPage(e.data.objParentPage, {
				title: e.data.strGenre,
				content: $artistsGenresContent
			});
			artistPage.setContextMenu(
				[
					{
						'icon':'close', 'title':mkf.lang.get('ctxt_btn_close_album_list'), 'shortcut':'Ctrl+1', 'onClick':
						function() {
							mkf.pages.closeTempPage(artistPage);
							return false;
						}
					}
				]
			);
			mkf.pages.showTempPage(artistPage);

			// show artist's
			$artistsGenresContent.addClass('loading');
			xbmc.getGenresAlbums({
				genreid: e.data.idGenre,

				onError: function() {
					mkf.messageLog.show(mkf.lang.get('message_failed_album_list'), mkf.messageLog.status.error, 5000);
					$artistsGenresContent.removeClass('loading');
				},

				onSuccess: function(result) {
					$artistsGenresContent.defaultAlbumViewer(result, artistPage);
					$artistsGenresContent.removeClass('loading');
				}
			});

			return false;
		},
		
		/*------*/
		AlbumPlay: function(e) {
			var messageHandle = mkf.messageLog.show(mkf.lang.get('message_playing_album'));
			xbmc.playAlbum({
				albumid: e.data.idAlbum,
				onSuccess: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_ok'), 2000, mkf.messageLog.status.success);
				},
				onError: function(errorText) {
					mkf.messageLog.appendTextAndHide(messageHandle, errorText, 8000, mkf.messageLog.status.error);
				}
			});
			return false;
		},
		
		/*---------------*/
		AddAlbumToPlaylist: function(e) {
			var messageHandle = mkf.messageLog.show(mkf.lang.get('messsage_add_album_to_playlist'));
			xbmc.addAlbumToPlaylist({
				albumid: e.data.idAlbum,
				onSuccess: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_ok'), 2000, mkf.messageLog.status.success);
				},
				onError: function(errorText) {
					mkf.messageLog.appendTextAndHide(messageHandle, errorText, 8000, mkf.messageLog.status.error);
				}
			});
			return false;
		},

		/*----------*/
		Songlist: function(e) {
			// open new page to show album's songs
			var $songlistContent = $('<div class="pageContentWrapper"></div>');
			var songlistPage = mkf.pages.createTempPage(e.data.objParentPage, {
				title: e.data.strAlbum,
				content: $songlistContent
			});
			songlistPage.setContextMenu(
				[
					{
						'icon':'close', 'title':mkf.lang.get('ctxt_btn_close_song_list'), 'shortcut':'Ctrl+1', 'onClick':
						function() {
							mkf.pages.closeTempPage(songlistPage);
							return false;
						}
					}
				]
			);
			mkf.pages.showTempPage(songlistPage);

			// show album's songs
			$songlistContent.addClass('loading');
			xbmc.getAlbumsSongs({
				albumid: e.data.idAlbum,

				onError: function() {
					mkf.messageLog.show(mkf.lang.get('message_failed_albums_songs'), mkf.messageLog.status.error, 5000);
					$songlistContent.removeClass('loading');
				},

				onSuccess: function(result) {
					$songlistContent.defaultSonglistViewer(result);
					$songlistContent.removeClass('loading');
				}
			});

			return false;
		},

		/*-----*/
		SongPlay: function(e) {
			var messageHandle = mkf.messageLog.show(mkf.lang.get('message_playing_song'));
			xbmc.playSong({
				songid: e.data.idSong,
				onSuccess: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_ok'), 2000, mkf.messageLog.status.success);
				},
				onError: function(errorText) {
					mkf.messageLog.appendTextAndHide(messageHandle, errorText, 8000, mkf.messageLog.status.error);
				}
			});
			return false;
		},

		/*--------------*/
		AddSongToPlaylist: function(e) {
			var messageHandle = mkf.messageLog.show(mkf.lang.get('messsage_add_song_to_playlist'));
			xbmc.addSongToPlaylist({
				songid: e.data.idSong,
				onSuccess: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_ok'), 2000, mkf.messageLog.status.success);
				},
				onError: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_failed'), 8000, mkf.messageLog.status.error);
				}
			});
			return false;
		},

		/*---------*/
		SongPlayNext: function(e) {
			var messageHandle = mkf.messageLog.show(mkf.lang.get('message_playing_song_next'));
			xbmc.playSongNext({
				songid: e.data.idSong,
				onSuccess: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_ok'), 2000, mkf.messageLog.status.success);
				},
				onError: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_failed'), 8000, mkf.messageLog.status.error);
				}
			});
			return false;
		},
		
/*--------------------*/
/* Movie UI functions */
/*--------------------*/

		/*------*/
		MoviePlay: function(event) {
			var messageHandle = mkf.messageLog.show(mkf.lang.get('message_playing_movie'));

			xbmc.playMovie({
				movieid: event.data.idMovie,
				onSuccess: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_ok'), 2000, mkf.messageLog.status.success);
				},
				onError: function(errorText) {
					mkf.messageLog.appendTextAndHide(messageHandle, errorText, 8000, mkf.messageLog.status.error);
				}
			});

			return false;
		},

		/*---------------*/
		AddMovieToPlaylist: function(event) {
			var messageHandle = mkf.messageLog.show(mkf.lang.get('messsage_add_movie_to_playlist'));

			xbmc.addMovieToPlaylist({
				movieid: event.data.idMovie,
				onSuccess: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_ok'), 2000, mkf.messageLog.status.success);
				},
				onError: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_failed'), 8000, mkf.messageLog.status.error);
				}
			});

			return false;
		},
		
		/*-------------*/
		MovieInfoOverlay: function(e) {
			var dialogHandle = mkf.dialog.show();
			var useFanart = mkf.cookieSettings.get('usefanart', 'no')=='yes'? true : false;

			xbmc.getMovieInfo({
				movieid: e.data.idMovie,
				onSuccess: function(movie) {
					//var dialogContent = '';
					var fileDownload = '';
					
					xbmc.getPrepDownload({
						path: movie.file,
						onSuccess: function(result) {
							fileDownload = xbmc.getUrl(result.details.path);
							// no better way?
							$('.filelink').find('a').attr('href',fileDownload);
						},
						onError: function(errorText) {
							$('.filelink').find('a').replaceWith(movie.file);
						},
					});
					
					
					var streamdetails = {
						vFormat: 'SD',
						vCodec: 'Unknown',
						aCodec: 'Unknown',
						channels: 0,
						aStreams: 0,
						hasSubs: false,
						aLang: '',
						aspect: 0,
						vwidth: 0
					};
					
					if ( useFanart ) {
						$('.mkfOverlay').css('background-image', 'url("' + xbmc.getThumbUrl(movie.fanart) + '")');
					};
					
					if (movie.streamdetails) {
						if (movie.streamdetails.subtitle) { streamdetails.hasSubs = true };
						if (movie.streamdetails.audio) {
							streamdetails.channels = movie.streamdetails.audio[0].channels;
							streamdetails.aStreams = movie.streamdetails.audio.length;
							$.each(movie.streamdetails.audio, function(i, audio) { streamdetails.aLang += audio.language + ' ' } );
							if ( streamdetails.aLang == ' ' ) { streamdetails.aLang = mkf.lang.get('label_not_available') };
						};
					streamdetails.aspect = xbmc.getAspect(movie.streamdetails.video[0].aspect);
					//Get video standard
					streamdetails.vFormat = xbmc.getvFormat(movie.streamdetails.video[0].width);
					//Get video codec
					streamdetails.vCodec = xbmc.getVcodec(movie.streamdetails.video[0].codec);
					//Set audio icon
					streamdetails.aCodec = xbmc.getAcodec(movie.streamdetails.audio[0].codec);
					};
					
					var thumb = (movie.thumbnail? xbmc.getThumbUrl(movie.thumbnail) : 'images/thumb' + xbmc.getMovieThumbType() + '.png');
					//dialogContent += '<img src="' + thumb + '" class="thumb thumb' + xbmc.getMovieThumbType() + ' dialogThumb" />' + //Won't this always be poster?!
					var dialogContent = $('<div><img src="' + thumb + '" class="thumb thumbPosterLarge dialogThumb" /></div>' +
						'<div><h1 class="underline">' + movie.title + '</h1></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_original_title') + '</span><span class="value">' + (movie.originaltitle? movie.originaltitle : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_runtime') + '</span><span class="value">' + (movie.runtime? movie.runtime : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_genre') + '</span><span class="value">' + (movie.genre? movie.genre : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_rating') + '</span><span class="value"><div class="smallRating' + Math.round(movie.rating) + '"></div></span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_votes') + '</span><span class="value">' + (movie.votes? movie.votes : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_year') + '</span><span class="value">' + (movie.year? movie.year : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_director') + '</span><span class="value">' + (movie.director? movie.director : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_writer') + '</span><span class="value">' + (movie.writer? movie.writer : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_studio') + '</span><span class="value">' + (movie.studio? movie.studio : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_tagline') + '</span><span class="value">' + (movie.tagline? movie.tagline : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_set') + '</span><span class="value">' + (movie.set[0]? movie.set : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_lastplayed') + '</span><span class="value">' + (movie.lastplayed? movie.lastplayed : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_playcount') + '</span><span class="value">' + (movie.playcount? movie.playcount : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_audioStreams') + '</span><span class="value">' + (streamdetails.aStreams? streamdetails.aStreams + ' - ' + streamdetails.aLang : mkf.lang.get('label_not_available')) + '</span></div>' +
						(movie.imdbnumber? '<div class="movieinfo"><span class="label">IMDB:</span><span class="value">' + '<a href="http://www.imdb.com/title/' + movie.imdbnumber + '">IMDB</a>' + '</span></div></div>' : '') +
						'<div class="movieinfo filelink"><span class="label">' + mkf.lang.get('label_file') + '</span><span class="value">' + '<a href="' + fileDownload + '">' + movie.file + '</a>' + '</span></div></div>' +
						'<p class="plot">' + movie.plot + '</p>' +
						'<div class="movietags"><span class="infoqueue" title="' + mkf.lang.get('btn_enqueue') + '" /><span class="infoplay" title="' + mkf.lang.get('btn_play') + '" /></div>');

					if (movie.streamdetails) {
						dialogContent.filter('.movietags').prepend('<div class="vFormat' + streamdetails.vFormat + '" />' +
						'<div class="aspect' + streamdetails.aspect + '" />' +
						'<div class="vCodec' + streamdetails.vCodec + '" />' +
						'<div class="aCodec' + streamdetails.aCodec + '" />' +
						'<div class="channels' + streamdetails.channels + '" />' +
						(streamdetails.hasSubs? '<div class="vSubtitles" />' : ''));
					};

					$(dialogContent).find('.infoplay').on('click', {idMovie: movie.movieid, strMovie: movie.label}, uiviews.MoviePlay);
					$(dialogContent).find('.infoqueue').on('click', {idMovie: movie.movieid, strMovie: movie.label}, uiviews.AddMovieToPlaylist);
					mkf.dialog.setContent(dialogHandle, dialogContent);
					return false;
				},
				onError: function() {
					mkf.messageLog.show('Failed to load movie information!', mkf.messageLog.status.error, 5000);
					mkf.dialog.close(dialogHandle);
				}
			});
			return false;
		},

		/*------------*/
		MovieInfoInline: function(m, callback) {
			var dialogContent;
			xbmc.getMovieInfo({
				movieid: m,
				onSuccess: function(movie) {
					var fileDownload = '';
					
					xbmc.getPrepDownload({
						path: movie.file,
						onSuccess: function(result) {
							fileDownload = xbmc.getUrl(result.details.path);
							// no better way?
							$('.filelink').find('a').attr('href',fileDownload);
						},
						onError: function(errorText) {
							$('.filelink').find('a').replaceWith(movie.file);
						},
					});
					
					var streamdetails = {
						vFormat: 'SD',
						vCodec: 'Unknown',
						aCodec: 'Unknown',
						channels: 0,
						aStreams: 0,
						hasSubs: false,
						aLang: '',
						aspect: 0,
						vwidth: 0
					};
					
					if (movie.streamdetails) {
						if (movie.streamdetails.subtitle) { streamdetails.hasSubs = true };
						if (movie.streamdetails.audio) {
							streamdetails.channels = movie.streamdetails.audio[0].channels;
							streamdetails.aStreams = movie.streamdetails.audio.length;
							$.each(movie.streamdetails.audio, function(i, audio) { streamdetails.aLang += audio.language + ' ' } );
							if ( streamdetails.aLang == ' ' ) { streamdetails.aLang = mkf.lang.get('label_not_available') };
						};
					streamdetails.aspect = xbmc.getAspect(movie.streamdetails.video[0].aspect);
					//Get video standard
					streamdetails.vFormat = xbmc.getvFormat(movie.streamdetails.video[0].width);
					//Get video codec
					streamdetails.vCodec = xbmc.getVcodec(movie.streamdetails.video[0].codec);
					//Set audio icon
					streamdetails.aCodec = xbmc.getAcodec(movie.streamdetails.audio[0].codec);
					};
					
					var thumb = (movie.thumbnail? xbmc.getThumbUrl(movie.thumbnail) : 'images/thumb' + xbmc.getMovieThumbType() + '.png');
					dialogContent = $('<div style="float: left; margin-right: 5px;"><img src="' + thumb + '" class="thumb thumbPosterLarge dialogThumb" /></div>' +
					'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_original_title') + '</span><span class="value">' + (movie.originaltitle? movie.originaltitle : mkf.lang.get('label_not_available')) + '</span></div>' +
					'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_runtime') + '</span><span class="value">' + (movie.runtime? movie.runtime : mkf.lang.get('label_not_available')) + '</span></div>' +
					'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_genre') + '</span><span class="value">' + (movie.genre? movie.genre : mkf.lang.get('label_not_available')) + '</span></div>' +
					'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_rating') + '</span><span class="value"><div class="smallRating' + Math.round(movie.rating) + '"></div></span></div>' +
					'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_votes') + '</span><span class="value">' + (movie.votes? movie.votes : mkf.lang.get('label_not_available')) + '</span></div>' +
					'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_year') + '</span><span class="value">' + (movie.year? movie.year : mkf.lang.get('label_not_available')) + '</span></div>' +
					'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_director') + '</span><span class="value">' + (movie.director? movie.director : mkf.lang.get('label_not_available')) + '</span></div>' +
					'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_writer') + '</span><span class="value">' + (movie.writer? movie.writer : mkf.lang.get('label_not_available')) + '</span></div>' +
					'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_studio') + '</span><span class="value">' + (movie.studio? movie.studio : mkf.lang.get('label_not_available')) + '</span></div>' +
					'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_tagline') + '</span><span class="value">' + (movie.tagline? movie.tagline : mkf.lang.get('label_not_available')) + '</span></div>' +
					'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_set') + '</span><span class="value">' + (movie.set[0]? movie.set : mkf.lang.get('label_not_available')) + '</span></div>' +
					'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_lastplayed') + '</span><span class="value">' + (movie.lastplayed? movie.lastplayed : mkf.lang.get('label_not_available')) + '</span></div>' +
					'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_playcount') + '</span><span class="value">' + (movie.playcount? movie.playcount : mkf.lang.get('label_not_available')) + '</span></div>' +
					'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_audioStreams') + '</span><span class="value">' + (streamdetails.aStreams? streamdetails.aStreams + ' - ' + streamdetails.aLang : mkf.lang.get('label_not_available')) + '</span></div>' +
					(movie.imdbnumber? '<div class="movieinfo"><span class="label">IMDB:</span><span class="value">' + '<a href="http://www.imdb.com/title/' + movie.imdbnumber + '">IMDB</a>' + '</span></div></div>' : '') +
					'<div class="movieinfo filelink"><span class="label">' + mkf.lang.get('label_file') + '</span><span class="value">' + '<a href="' + fileDownload + '">' + movie.file + '</a>' + '</span></div></div>' +
					'<p class="plot" style="display: block; clear: left">' + movie.plot + '</p>' +
					'<div class="movietags" style="display: inline-block; width: auto"><span class="infoqueue" title="' + mkf.lang.get('btn_enqueue') + '" /><span class="infoplay" title="' + mkf.lang.get('btn_play') + '" /></div>');

					if (movie.streamdetails) {
						dialogContent.filter('.movietags').prepend('<div class="vFormat' + streamdetails.vFormat + '" />' +
						'<div class="aspect' + streamdetails.aspect + '" />' +
						'<div class="vCodec' + streamdetails.vCodec + '" />' +
						'<div class="aCodec' + streamdetails.aCodec + '" />' +
						'<div class="channels' + streamdetails.channels + '" />' +
						(streamdetails.hasSubs? '<div class="vSubtitles" />' : ''));
					};
						//return dialogContent;
						callback(dialogContent);
						$(dialogContent).find('.infoplay').on('click', {idMovie: movie.movieid, strMovie: movie.label}, uiviews.MoviePlay);
						$(dialogContent).find('.infoqueue').on('click', {idMovie: movie.movieid, strMovie: movie.label}, uiviews.AddMovieToPlaylist);
						
					},
					onError: function() {
						mkf.messageLog.show('Failed to load movie information!', mkf.messageLog.status.error, 5000);
						mkf.dialog.close(dialogHandle);
					}
				
			});
		},

/*-----------------*/
/* TV UI functions */
/*-----------------*/

		/*--------*/
		EpisodePlay: function(e) {
			var messageHandle = mkf.messageLog.show(mkf.lang.get('message_playing_episode'));

			xbmc.playEpisode({
				episodeid: e.data.idEpisode,
				onSuccess: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_ok'), 2000, mkf.messageLog.status.success);
				},
				onError: function(errorText) {
					mkf.messageLog.appendTextAndHide(messageHandle, errorText, 8000, mkf.messageLog.status.error);
				}
			});

			return false;
		},

		/*-----------------*/
		AddEpisodeToPlaylist: function(e) {
			var messageHandle = mkf.messageLog.show(mkf.lang.get('messsage_add_episode_to_playlist'));

			xbmc.addEpisodeToPlaylist({
				episodeid: e.data.idEpisode,
				onSuccess: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_ok'), 2000, mkf.messageLog.status.success);
				},
				onError: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_failed'), 8000, mkf.messageLog.status.error);
				}
			});

			return false;
		},
		
		/*--------------*/
		TVShowInfoOverlay: function(e) {
			var dialogHandle = mkf.dialog.show();
			var useFanart = mkf.cookieSettings.get('usefanart', 'no')=='yes'? true : false;

			var NA = mkf.lang.get('label_not_available');
			var tvshow = {
				title: NA,
				originaltitle: NA,
				runtime: NA,
				genre: NA,
				rating: 0,
				year: NA,
				director: NA,
				file: NA,
				plot: NA
			};
			$.extend(tvshow, e.data.tvshow);
			var dialogContent = '';

			if ( useFanart ) {
				$('.mkfOverlay').css('background-image', 'url("' + xbmc.getThumbUrl(tvshow.fanart) + '")');
			};
			
			var thumb = (tvshow.thumbnail? xbmc.getThumbUrl(tvshow.thumbnail) : 'images/thumb' + xbmc.getTvShowThumbType() + '.png');
			var valueClass = 'value' + xbmc.getTvShowThumbType();
			dialogContent += '<img src="' + thumb + '" class="thumb thumb' + xbmc.getTvShowThumbType() + ' dialogThumb' + xbmc.getTvShowThumbType() + '" />' +
				'<h1 class="underline">' + tvshow.title + '</h1>' +
				//'<div class="test"><img src="' + tvshow.file + 'logo.png' + '" /></div>' +
				//'<div class="test"><span class="label">' + mkf.lang.get('label_runtime') + '</span><span class="'+valueClass+'">' + tvshow.runtime + '</span></div>' +
				'<div class="test"><span class="label">' + mkf.lang.get('label_genre') + '</span><span class="'+valueClass+'">' + (tvshow.genre? tvshow.genre : mkf.lang.get('label_not_available')) + '</span></div>' +
				'<div class="test"><span class="label">' + mkf.lang.get('label_rating') + '</span><span class="'+valueClass+'"><div class="smallRating' + Math.round(tvshow.rating) + '"></div></span></div>' +
				'<div class="test"><span class="label">' + mkf.lang.get('label_year') + '</span><span class="'+valueClass+'">' + (tvshow.year? tvshow.year : mkf.lang.get('label_not_available')) + '</span></div>' +
				//'<div class="test"><span class="label">' + mkf.lang.get('label_director') + '</span><span class="'+valueClass+'">' + tvshow.director + '</span></div>' +
				'<div class="test"><span class="label">' + mkf.lang.get('label_file') + '</span><span class="'+valueClass+'">' + tvshow.file + '</span></div>' +
				'<p class="plot">' + tvshow.plot + '</p>';
			mkf.dialog.setContent(dialogHandle, dialogContent);

			return false;
		}, // END onTVShowInformationClick

		/*--------*/
		EpisodeInfo: function(e) {
			var dialogHandle = mkf.dialog.show();
			var useFanart = mkf.cookieSettings.get('usefanart', 'no')=='yes'? true : false;

			xbmc.getEpisodeDetails({
				episodeid: e.data.idEpisode,
				onSuccess: function(ep) {
					var dialogContent = '';
					
					var fileDownload = '';
					xbmc.getPrepDownload({
						path: ep.file,
						onSuccess: function(result) {
							fileDownload = xbmc.getUrl(result.details.path);
							// no better way?
							$('.movieinfo').find('a').attr('href',fileDownload);
						},
						onError: function(errorText) {
							$('.movieinfo').find('a').replaceWith(ep.file);
						},
					});

					var streamdetails = {
						vFormat: 'SD',
						vCodec: 'Unknown',
						aCodec: 'Unknown',
						channels: 0,
						aStreams: 0,
						hasSubs: false,
						aLang: '',
						aspect: 0,
						vwidth: 0
					};

					if (ep.streamdetails) {
						if (ep.streamdetails.subtitle) { streamdetails.hasSubs = true };
						if (ep.streamdetails.audio) {
							streamdetails.channels = ep.streamdetails.audio[0].channels;
							streamdetails.aStreams = ep.streamdetails.audio.length;
							$.each(ep.streamdetails.audio, function(i, audio) { streamdetails.aLang += audio.language + ' ' } );
							if ( streamdetails.aLang == ' ' ) { streamdetails.aLang = mkf.lang.get('label_not_available') };
						};
					streamdetails.aspect = xbmc.getAspect(ep.streamdetails.video[0].aspect);
					//Get video standard
					streamdetails.vFormat = xbmc.getvFormat(ep.streamdetails.video[0].width);
					//Get video codec
					streamdetails.vCodec = xbmc.getVcodec(ep.streamdetails.video[0].codec);
					//Set audio icon
					streamdetails.aCodec = xbmc.getAcodec(ep.streamdetails.audio[0].codec);
					};
					
					if ( useFanart ) {
						$('.mkfOverlay').css('background-image', 'url("' + xbmc.getThumbUrl(ep.fanart) + '")');
					};	
					
					var thumb = (ep.thumbnail? xbmc.getThumbUrl(ep.thumbnail) : 'images/thumb' + xbmc.getMovieThumbType() + '.png');
					//dialogContent += '<img src="' + thumb + '" class="thumb thumb' + xbmc.getMovieThumbType() + ' dialogThumb" />' + //Won't this always be poster?!
					var dialogContent = $('<div><img src="' + thumb + '" class="thumbFanart dialogThumb" /></div>' +
						'<div><h1 class="underline">' + ep.title + '</h1></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_episode') + '</span><span class="value">' + (ep.episode? ep.episode : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_season') + '</span><span class="value">' + (ep.season? ep.season : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_runtime') + '</span><span class="value">' + (ep.runtime? ep.runtime : mkf.lang.get('label_not_available')) + '</span></div>' +						
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_rating') + '</span><span class="value"><div class="smallRating' + Math.round(ep.rating) + '"></div></span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_votes') + '</span><span class="value">' + (ep.votes? ep.votes : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_firstaired') + '</span><span class="value">' + (ep.firstaired? ep.firstaired : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_lastplayed') + '</span><span class="value">' + (ep.lastplayed? ep.lastplayed : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_playcount') + '</span><span class="value">' + (ep.playcount? ep.playcount : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_audioStreams') + '</span><span class="value">' + (streamdetails.aStreams? streamdetails.aStreams + ' - ' + streamdetails.aLang : mkf.lang.get('label_not_available')) + '</span></div>' +
						'<div class="movieinfo"><span class="label">' + mkf.lang.get('label_file') + '</span><span class="value">' + '<a href="' + fileDownload + '">' + ep.file + '</a>' + '</span></div></div>' +
						'<p class="plot">' + ep.plot + '</p>' +
						'<div class="movietags"><span class="infoqueue" title="' + mkf.lang.get('btn_enqueue') + '" /><span class="infoplay" title="' + mkf.lang.get('btn_play') + '" /></div>');

					if (ep.streamdetails) {
						dialogContent.filter('.movietags').prepend('<div class="vFormat' + streamdetails.vFormat + '" />' +
						'<div class="aspect' + streamdetails.aspect + '" />' +
						'<div class="vCodec' + streamdetails.vCodec + '" />' +
						'<div class="aCodec' + streamdetails.aCodec + '" />' +
						'<div class="channels' + streamdetails.channels + '" />' +
						(streamdetails.hasSubs? '<div class="vSubtitles" />' : ''));
					};

					$(dialogContent).find('.infoplay').on('click', {idEpisode: ep.episodeid, strMovie: ep.label}, uiviews.EpisodePlay);
					$(dialogContent).find('.infoqueue').on('click', {idEpisode: ep.episodeid, strMovie: ep.label}, uiviews.AddEpisodeToPlaylist);
					mkf.dialog.setContent(dialogHandle, dialogContent);
					return false;
				},
				onError: function() {
					mkf.messageLog.show('Failed to load episode information!', mkf.messageLog.status.error, 5000);
					mkf.dialog.close(dialogHandle);
				}
			});
			return false;
		},
		
		/*--------*/
		SeasonsList: function(e) {
			// open new page to show tv show's seasons
			var $seasonsContent = $('<div class="pageContentWrapper"></div>');
			var seasonsPage = mkf.pages.createTempPage(e.data.objParentPage, {
				title: e.data.strTvShow,
				content: $seasonsContent
			});
			seasonsPage.setContextMenu(
				[
					{
						'icon':'close', 'title':mkf.lang.get('ctxt_btn_close_season_list'), 'shortcut':'Ctrl+1', 'onClick':
						function() {
							mkf.pages.closeTempPage(seasonsPage);
							return false;
						}
					}
				]
			);
			mkf.pages.showTempPage(seasonsPage);

			// show tv show's seasons
			$seasonsContent.addClass('loading');
			xbmc.getSeasons({
				tvshowid: e.data.idTvShow,

				onError: function() {
					mkf.messageLog.show(mkf.lang.get('message_failed_tvshows_seasons'), mkf.messageLog.status.error, 5000);
					$seasonsContent.removeClass('loading');
				},

				onSuccess: function(result) {
					$seasonsContent.defaultSeasonsViewer(result, e.data.idTvShow, seasonsPage);
					$seasonsContent.removeClass('loading');
				}
			});

			return false;
		},

		/*------*/
		Unwatched: function(e) {
			var $unwatchedEpsContent = $('<div class="pageContentWrapper"></div>');
			var unwatchedEpsPage = mkf.pages.createTempPage(e.data.objParentPage, {
				title: e.data.strTvShow,
				content: $unwatchedEpsContent
			});
			unwatchedEpsPage.setContextMenu(
				[
					{
						'icon':'close', 'title':mkf.lang.get('ctxt_btn_close_season_list'), 'shortcut':'Ctrl+1', 'onClick':
						function() {
							mkf.pages.closeTempPage(unwatchedEpsPage);
							return false;
						}
					}
				]
			);
			mkf.pages.showTempPage(unwatchedEpsPage);

			$unwatchedEpsContent.addClass('loading');
			xbmc.getunwatchedEps({
				tvshowid: e.data.idTvShow,

				onError: function() {
					mkf.messageLog.show(mkf.lang.get('message_failed'), mkf.messageLog.status.error, 5000);
					$unwatchedEpsContent.removeClass('loading');
				},

				onSuccess: function(result) {
					if (result.length == 0) {
					mkf.messageLog.show(mkf.lang.get('message_nounwatched'), mkf.messageLog.status.error, 5000);
					mkf.pages.closeTempPage(unwatchedEpsPage);
					return false;
					};
					$unwatchedEpsContent.defaultunwatchedEpsViewer(result, e.data.idTvShow, unwatchedEpsPage);
					$unwatchedEpsContent.removeClass('loading');

				}
			});

			return false;
		},

		/*-----------*/
		SeasonEpisodes: function(e) {
			var $episodesContent = $('<div class="pageContentWrapper"></div>');
			var episodesPage = mkf.pages.createTempPage(e.data.objParentPage, {
				title: e.data.strSeason,
				content: $episodesContent
			});
			episodesPage.setContextMenu(
				[
					{
						'icon':'close', 'title':mkf.lang.get('ctxt_btn_close_episode_list'), 'shortcut':'Ctrl+1', 'onClick':
						function() {
							mkf.pages.closeTempPage(episodesPage);
							return false;
						}
					}
				]
			);
			mkf.pages.showTempPage(episodesPage);

			// show season's episodes
			$episodesContent.addClass('loading');
			xbmc.getEpisodes({
				tvshowid: e.data.idTvShow,
				season: e.data.seasonNum,

				onError: function() {
					mkf.messageLog.show(mkf.lang.get('message_failed_seasons_episodes'), mkf.messageLog.status.error, 5000);
					$episodesContent.removeClass('loading');
				},

				onSuccess: function(result) {
					$episodesContent.defaultEpisodesViewer(result);
					$episodesContent.removeClass('loading');
				}
			});

			return false;
		},
	
/*-----------------------*/
/* Playlist UI functions */
/*-----------------------*/
	
		/*--------------------*/
		PlaylistAudioItemRemove: function(e) {
			var messageHandle = mkf.messageLog.show(mkf.lang.get('message_removing_item'));
			
			xbmc.removeAudioPlaylistItem({
				item: e.data.itemNum,
				onSuccess: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_ok'), 2000, mkf.messageLog.status.success);
					awxUI.onMusicPlaylistShow();
				},
				onError: function(errorText) {
					mkf.messageLog.appendTextAndHide(messageHandle, errorText, 8000, mkf.messageLog.status.error);
				}
			});
		
			return false;
		},

		/*------------------*/
		PlaylistAudioItemPlay: function(e) {
			var messageHandle = mkf.messageLog.show(mkf.lang.get('message_playing_item'));

			xbmc.playAudio({
				item: e.data.itemNum,
				onSuccess: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_ok'), 2000, mkf.messageLog.status.success);
				},
				onError: function(errorText) {
					mkf.messageLog.appendTextAndHide(messageHandle, errorText, 8000, mkf.messageLog.status.error);
				}
			});

			return false;
		},

		/*--------------------*/
		PlaylistVideoItemRemove: function(e) {
			var messageHandle = mkf.messageLog.show(mkf.lang.get('message_removing_item'));
			
			xbmc.removeVideoPlaylistItem({
				item: e.data.itemNum,
				onSuccess: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_ok'), 2000, mkf.messageLog.status.success);
					awxUI.onVideoPlaylistShow();
				},
				onError: function(errorText) {
					mkf.messageLog.appendTextAndHide(messageHandle, errorText, 8000, mkf.messageLog.status.error);
				}
			});
		
			return false;
		},

		/*------------------*/
		PlaylistVideoItemPlay: function(e) {
			var messageHandle = mkf.messageLog.show(mkf.lang.get('message_playing_item'));

			xbmc.playVideo({
				item: e.data.itemNum,
				onSuccess: function() {
					mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_ok'), 2000, mkf.messageLog.status.success);
				},
				onError: function(errorText) {
					mkf.messageLog.appendTextAndHide(messageHandle, errorText, 8000, mkf.messageLog.status.error);
				}
			});

			return false;
		},
		
/*----------*/
/* UI Views */
/*----------*/

/*-------------*/
/* Audio views */
/*-------------*/

		/*----Artists list view----*/
		ArtistViewList: function(artists, parentPage) {
			var $artistList = $('<ul class="fileList"></ul>');

				$.each(artists.artists, function(i, artist)  {
					$artistList.append('<li' + (i%2==0? ' class="even"': '') + '><a href="" class="artist' +
										artist.artistid + '">' +
										artist.label + '<div class="findKeywords">' + artist.label.toLowerCase() + '</div>' +
										'</a></li>');
					$artistList.find('.artist' + artist.artistid)
						.bind('click',{ idArtist: artist.artistid, strArtist: artist.label, objParentPage: parentPage }, uiviews.ArtistAlbums);
				});

			return $artistList;
		},
		
		/*----Audio genres list view----*/
		AudioGenresViewList: function(agenres, parentPage) {
			var $artistGenresList = $('<ul class="fileList"></ul>');
			$.each(agenres.genres, function(i, artistGenres)  {
				if (artistGenres.genreid == 0) { return };
				$artistGenresList.append('<li' + (i%2==0? ' class="even"': '') + 
									'><div class="folderLinkWrapper"><a href="" class="button allgenre' + artistGenres.genreid + '" title="' + mkf.lang.get('btn_all') +
									'"><span class="miniIcon all" /></a><a href="" class="genre' + 
									artistGenres.genreid + '">' +
									artistGenres.label + '<div class="findKeywords">' + artistGenres.label.toLowerCase() + '</div>' +
									'</a></div></li>');
				$artistGenresList.find('.allgenre' + artistGenres.genreid).on('click', {idGenre: artistGenres.genreid, strGenre: artistGenres.label, objParentPage: parentPage}, uiviews.AllGenreAlbums);
				$artistGenresList.find('.genre' + artistGenres.genreid).bind('click',{idGenre: artistGenres.genreid,strGenre: artistGenres.label, objParentPage: parentPage}, uiviews.GenreArtists);
			});
			return $artistGenresList;
		},
		
		/*----Audio Playlists list view----*/
		AudioPlaylistsViewList: function(aplaylists, callback) {
			var $audioPlaylists = $('<ul class="fileList"></ul>');
			$.each (aplaylists, function() {
				if (aplaylists > 0) {
					$.each(aplaylists, function(i, playlist)  {
						$audioPlaylists.append('<li' + (i%2==0? ' class="even"': '') + '><div class="folderLinkWrapper">' +
											'<a href="" class="button playlistinfo' + i +'" title="' + mkf.lang.get('btn_enqueue') + '"><span class="miniIcon enqueue" /></a>' +
											'<a href="" class="button play' + i + '" title="' + mkf.lang.get('btn_play') + '"><span class="miniIcon play" /></a>' +
											'<a href="" class="playlist' + i + '">' + playlist.label +
											(playlist.artist? ' - Artist: ' + playlist.artist : '') +
											(playlist.album && playlist.label != playlist.album? ' - Album: ' + playlist.album : '') +
											' - Type: ' + 
											(playlist.type == 'unknown' ? 'Playlist' : playlist.type) + '<div class="findKeywords">' + playlist.label.toLowerCase() + '</div>' +
											'</a></div></li>');
						//$audioPlaylists.find('.playlist' + i).bind('click', {id: playlist.id,strFile: playlist.file,strLabel: playlist.label, strType: playlist.type}, MusicPlaylists);
						//$audioPlaylists.find('.playlistinfo' + i).bind('click', {playlistinfo: playlist}, onAddPlaylistToPlaylistClick);
						//$audioPlaylists.find('.play' + i).bind('click', {playlistinfo: playlist}, onPlaylistsPlayClick);
					});
				}
			});
			return $audioPlaylists;
		},
		
		/*----Album list view----*/
		AlbumsViewList: function(albums, parentPage) {
			//var albums = albumResult.albums;
			var $albumsList = $('<ul class="fileList"></ul>');
				$.each(albums.albums, function(i, album)  {
					$album = $('<li' + (i%2==0? ' class="even"': '') + '><div class="folderLinkWrapper">' + 
						'<a href="" class="button playlist" title="' + mkf.lang.get('btn_enqueue') + '"><span class="miniIcon enqueue" /></a>' +
						'<a href="" class="button play" title="' + mkf.lang.get('btn_play') + '"><span class="miniIcon play" /></a>' +
						'<a href="" class="album' + album.albumid + '">' + album.label + ' - ' + album.artist + '<div class="findKeywords">' + album.label.toLowerCase() + ' ' + album.artist.toLowerCase() + '</div>' +
						'</a></div></li>').appendTo($albumsList);

					$album.find('.album'+ album.albumid).bind('click', {idAlbum: album.albumid, strAlbum: album.label, objParentPage: parentPage }, uiviews.Songlist);
					$album.find('.playlist').bind('click', {idAlbum: album.albumid}, uiviews.AddAlbumToPlaylist);
					$album.find('.play').bind('click', {idAlbum: album.albumid, strAlbum: album.label}, uiviews.AlbumPlay);
				});
			return $albumsList
		},
		
		/*----Albums thumbnail view----*/
		AlbumsViewThumbnails: function(albums, parentPage) {
			var useLazyLoad = mkf.cookieSettings.get('lazyload', 'no')=='yes'? true : false;
			var $albumsList = $('<div></div>');
			
			$.each(albums.albums, function(i, album) {
				var thumb = (album.thumbnail? xbmc.getThumbUrl(album.thumbnail) : 'images/thumb.png');
				$album = $('<div class="album'+album.albumid+' thumbWrapper">' +
						'<div class="linkWrapper">' + 
							'<a href="" class="play">' + mkf.lang.get('btn_play') + '</a><a href="" class="songs">' + mkf.lang.get('btn_songs') + '</a><a href="" class="playlist">' + mkf.lang.get('btn_enqueue') + '</a>' +
						'</div>' +
						(useLazyLoad?
							'<img src="images/loading_thumb.gif" alt="' + album.label + '" class="thumb" original="' + thumb + '" />':
							'<img src="' + thumb + '" alt="' + album.label + '" class="thumb" />'
						) +
						'<div class="albumName">' + album.label + '' +
						'<div class="albumArtist">' + album.artist + '</div></div>' +
						'<div class="findKeywords">' + album.label.toLowerCase() + ' ' + album.artist.toLowerCase() + '</div>' +
					'</div>');

				$albumsList.append($album);
				//$albumViewerElement.append($album);
				$album.find('.play').bind('click', {idAlbum: album.albumid, strAlbum: album.label}, uiviews.AlbumPlay);
				$album.find('.songs').bind('click', {idAlbum: album.albumid, strAlbum: album.label, objParentPage: parentPage }, uiviews.Songlist);
				$album.find('.playlist').bind('click', {idAlbum: album.albumid}, uiviews.AddAlbumToPlaylist);
			});
			return $albumsList;
		},
		
		/*----Song list view-----*/
		SongViewList: function(songs, options) {
			var $songList = $('<ul class="fileList"></ul>');

				$.each(songs.songs, function(i, song)  {
					var $song = $('<li' + (i%2==0? ' class="even"': '') + '><div class="folderLinkWrapper song' + song.songid + '"> <a href="" class="button playlist" title="' + mkf.lang.get('btn_enqueue') +
					'"><span class="miniIcon enqueue" /></a> <a href="" class="button playnext" title="' + mkf.lang.get('btn_playnext') +
					'"><span class="miniIcon playnext" /></a> <a href="" class="song play">' + song.track + '. ' + song.artist + ' - ' + song.label + '</a></div></li>').appendTo($songList);
					
					$song.find('.playlist').bind('click', {idSong: song.songid}, uiviews.AddSongToPlaylist);
					$song.find('.play').bind('click', {idSong: song.songid}, uiviews.SongPlay);
					$song.find('.playnext').bind('click', {idSong: song.songid}, uiviews.SongPlayNext);
				});
			return $songList;
		},
		
/*-------------*/
/* Movie views */
/*-------------*/

		/*----Movie list accordion view----*/
		MovieViewAccordion: function(movies, options) {
		
		var useLazyLoad = mkf.cookieSettings.get('lazyload', 'no')=='yes'? true : false;
		var filterWatched = mkf.cookieSettings.get('watched', 'no')=='yes'? true : false;
		var filterShowWatched = mkf.cookieSettings.get('hidewatchedmark', 'no')=='yes'? true : false;
		var useFanart = mkf.cookieSettings.get('usefanart', 'no')=='yes'? true : false;
		
		if (options) { filterWatched = options.filterWatched };
		
			//can't find accordion without this...?
			var page = $('<div></div>');
			
			var $moviesList = $('<div id="accordion"></div>').appendTo(page);
			var classEven = -1;
			
				$.each(movies.movies, function(i, movie) {
					var watched = false;
					if (typeof movie.movieid === 'undefined') { return; }
					if (movie.playcount > 0 && !filterShowWatched) { watched = true; }
					if (filterWatched && watched) { return; }

					classEven += 1;
							$movie = $('<h3 id="movieName' + movie.movieid + '"><a href="#">' + movie.label + (watched? '<img src="images/OverlayWatched_Small.png" />' : '') + '</a></h3><div>' + 
								'</div>').appendTo($moviesList);
				});
			
			//console.log($moviesList);
			
			page.find('#accordion').accordion({
				active:false,
				change:function(event, ui) {
					if(ui.newContent.html()!=""){ ui.newContent.empty(); }
					if(ui.newContent.html()==""){
						$('.ui-state-active').scrollTop(0);
						var movieID = $(ui.newHeader).attr('id').replace(/[^\d]+/g, '');
						ui.newContent.addClass('loading');
						uiviews.MovieInfoInline(movieID, function(movieInfoContent) {
							ui.newContent.removeClass('loading');
							ui.newContent.append(movieInfoContent);
							} ); 
					};
				},
				autoHeight: false,
				clearStyle: true,
				fillSpace: true,
				collapsible: true
				});
				
			return page;
		},		
		
		/*----Movie list inline info view----*/
		MovieViewListInline: function(movies, options) {
		
			var useLazyLoad = mkf.cookieSettings.get('lazyload', 'no')=='yes'? true : false;
			var filterWatched = mkf.cookieSettings.get('watched', 'no')=='yes'? true : false;
			var filterShowWatched = mkf.cookieSettings.get('hidewatchedmark', 'no')=='yes'? true : false;
			var useFanart = mkf.cookieSettings.get('usefanart', 'no')=='yes'? true : false;
			
			if (options) { filterWatched = options.filterWatched };
		
			//can't find accordion without this...?
			var page = $('<div></div>');
			
			var $moviesList = $('<div id="multiOpenAccordion"></div>').appendTo(page);
			var classEven = -1;
			
				$.each(movies.movies, function(i, movie) {
					var watched = false;
					if (typeof movie.movieid === 'undefined') { return; }
					if (movie.playcount > 0 && !filterShowWatched) { watched = true; }
					if (filterWatched && watched) { return; }

					classEven += 1;
							$movie = $('<h3 class="multiOpenAccordion-header" id="movieName' + movie.movieid + '"><a href="#">' + movie.label +
							(watched? '<img src="images/OverlayWatched_Small.png" />' : '') + '</a></h3><div class="multiOpenAccordion-content">' +
								'</div>').appendTo($moviesList);
				});
				
				
				page.find('div#multiOpenAccordion:eq(0)> div').hide();
					page.find('div#multiOpenAccordion:eq(0)> h3').click(function() {
						$(this).next().slideToggle('fast');
						if (!$(this).next().hasClass('filled')) {
							var movieID = $(this).attr('id').replace(/[^\d]+/g, '');
							var infodiv = $(this).next();
							
							infodiv.addClass('loading');

							uiviews.MovieInfoInline(movieID, function(movieInfoContent) {
								infodiv.removeClass('loading');
								infodiv.append(movieInfoContent);
								infodiv.addClass('filled');
								});
						} else if ($(this).next().hasClass('filled')) {
							//Clear for refresh and hopefully keep memory useage down.
							$(this).next().empty();
							$(this).next().removeClass('filled');
						}
					});
			
			return page;
		},
		
		/*----Movie list view----*/
		MovieViewList: function(movies, options) {
		
		var useLazyLoad = mkf.cookieSettings.get('lazyload', 'no')=='yes'? true : false;
		var filterWatched = mkf.cookieSettings.get('watched', 'no')=='yes'? true : false;
		var filterShowWatched = mkf.cookieSettings.get('hidewatchedmark', 'no')=='yes'? true : false;
		var useFanart = mkf.cookieSettings.get('usefanart', 'no')=='yes'? true : false;
		
		if (options) { filterWatched = options.filterWatched };
		
			var $movieList = $('<ul class="fileList"></ul>');
			var classEven = -1;
				$.each(movies.movies, function(i, movie) {
					var watched = false;
					if (typeof movie.movieid === 'undefined') { return; }
					if (movie.playcount > 0 && !filterShowWatched) { watched = true; }
					if (filterWatched && watched) { return; }
						
					classEven += 1
					$movie = $('<li' + (classEven%2==0? ' class="even"': '') + '><div class="folderLinkWrapper">' + 
						'<a href="" class="button playlist" title="' + mkf.lang.get('btn_enqueue') + '"><span class="miniIcon enqueue" /></a>' +
						'<a href="" class="button play" title="' + mkf.lang.get('btn_play') + '"><span class="miniIcon play" /></a>' +
						'<a href="" class="movieName' + movie.movieid + '">' + movie.label + (watched? '<img src="images/OverlayWatched_Small.png" />' : '') + '<div class="findKeywords">' + movie.label.toLowerCase() + '</div>' +
						'</a></div></li>').appendTo($movieList);

					$movie.find('.play').bind('click', {idMovie: movie.movieid, strMovie: movie.label}, uiviews.MoviePlay);
					$movie.find('.playlist').bind('click', {idMovie: movie.movieid}, uiviews.AddMovieToPlaylist);
					$movie.find('.movieName' + movie.movieid).bind('click', {idMovie: movie.movieid}, uiviews.MovieInfoOverlay);
				});
			return $movieList;
		},
		
		/*----Movie thumbnail view----*/
		MovieViewThumbnails: function(movies, options) {
		
		var useLazyLoad = mkf.cookieSettings.get('lazyload', 'no')=='yes'? true : false;
		var filterWatched = mkf.cookieSettings.get('watched', 'no')=='yes'? true : false;
		var filterShowWatched = mkf.cookieSettings.get('hidewatchedmark', 'no')=='yes'? true : false;
		var useFanart = mkf.cookieSettings.get('usefanart', 'no')=='yes'? true : false;
		
		if (options) { filterWatched = options.filterWatched };

		var $moviesList = $('<div></div>');
			$.each(movies.movies, function(i, movie) {
				var watched = false;
				// if movie has no id (e.g. movie sets), ignore it
				if (typeof movie.movieid === 'undefined') { return; }
				if (movie.playcount > 0) { watched = true; }
				if (filterWatched && watched) { return; }
				
				var thumb = (movie.thumbnail? xbmc.getThumbUrl(movie.thumbnail) : 'images/thumb' + xbmc.getMovieThumbType() + '.png');
				var $movie = $(
					'<div class="movie'+movie.movieid+' thumbWrapper thumb' + xbmc.getMovieThumbType() + 'Wrapper">' +
						'<div class="linkWrapper">' + 
							'<a href="" class="play">' + mkf.lang.get('btn_play') + '</a><a href="" class="playlist">' + mkf.lang.get('btn_enqueue') + '</a><a href="" class="info">' + mkf.lang.get('btn_information') + '</a>' +
							'<div class="movieRating' + Math.round(movie.rating) + '"></div>' +
						'</div>' +
						(useLazyLoad?
							'<img src="images/loading_thumb' + xbmc.getMovieThumbType() + '.gif" alt="' + movie.label + '" class="thumb thumb' + xbmc.getMovieThumbType() + '" original="' + thumb + '" />':
							'<img src="' + thumb + '" alt="' + movie.label + '" class="thumb thumb' + xbmc.getMovieThumbType() + '" />'
						) +
						'<div class="movieName">' + movie.label + (watched? '<img src="images/OverlayWatched_Small.png" />' : '') + '</div>' +
						'<div class="findKeywords">' + movie.label.toLowerCase() + '</div>' +
					'</div>').appendTo($moviesList);
				$movie.find('.play').bind('click', {idMovie: movie.movieid, strMovie: movie.label}, uiviews.MoviePlay);
				$movie.find('.playlist').bind('click', {idMovie: movie.movieid}, uiviews.AddMovieToPlaylist);
				$movie.find('.info').bind('click', {idMovie: movie.movieid}, uiviews.MovieInfoOverlay);
			});
			return $moviesList;
		},

/*----------*/
/* TV views */
/*----------*/

		/*----TV list view----*/
		TVViewList: function(shows, parentPage) {
			//var $tvshowContainer = $(this);
			var $tvShowList = $('<ul class="fileList"></ul>');
			
			//var useLazyLoad = mkf.cookieSettings.get('lazyload', 'no')=='yes'? true : false;
			var filterWatched = mkf.cookieSettings.get('watched', 'no')=='yes'? true : false;
			//var listview = mkf.cookieSettings.get('listview', 'no')=='yes'? true : false;
			var filterShowWatched = mkf.cookieSettings.get('hidewatchedmark', 'no')=='yes'? true : false;
		
			//if (listview) { var $tvShowList = $('<ul class="fileList"></ul>').appendTo($(this)); };
			var classEven = -1;

				$.each(shows.tvshows, function(i, tvshow) {
					var watched = false;
					if (tvshow.playcount > 0 && !filterShowWatched) { watched = true; }
					if (filterWatched && watched) { return; }
					
					classEven += 1
					$tvshow = $('<li' + (classEven%2==0? ' class="even"': '') + '><div class="folderLinkWrapper">' + 
						//'<a href="" class="season">' + mkf.lang.get('btn_seasons') + '</a>' +
						//'<a href="" class="info">' + mkf.lang.get('btn_information') + '</a>' +
						'<a href="" class="button info" title="' + mkf.lang.get('btn_information') + '"><span class="miniIcon information" /></a>' +
						'<a href="" class="button unwatched" title="' + mkf.lang.get('btn_unwatched') + '"><span class="miniIcon unwatched" /></a>' +
						'<a href="" class="tvshowName season">' + tvshow.label + (watched? '<img src="images/OverlayWatched_Small.png" />' : '') + '<div class="findKeywords">' + tvshow.label.toLowerCase() + '</div>' +
						'</a></div></li>').appendTo($tvShowList);

					$tvshow.find('.season').bind('click', {idTvShow: tvshow.tvshowid, strTvShow: tvshow.label, objParentPage: parentPage}, uiviews.SeasonsList);
					$tvshow.find('.info').bind('click', {'tvshow': tvshow}, uiviews.TVShowInfoOverlay);
					$tvshow.find('.unwatched').bind('click', {idTvShow: tvshow.tvshowid, strTvShow: tvshow.label, objParentPage: parentPage}, uiviews.Unwatched);
				});

			return $tvShowList;
		},
		
		/*----TV banner view----*/
		TVViewBanner: function(shows, parentPage) {
		
			var useLazyLoad = mkf.cookieSettings.get('lazyload', 'no')=='yes'? true : false;
			var filterWatched = mkf.cookieSettings.get('watched', 'no')=='yes'? true : false;
			//var listview = mkf.cookieSettings.get('listview', 'no')=='yes'? true : false;
			var filterShowWatched = mkf.cookieSettings.get('hidewatchedmark', 'no')=='yes'? true : false;
			
			var $tvShowList = $('<div></div>');
			
			if (shows.limits.total > 0) {
				$.each(shows.tvshows, function(i, tvshow) {
					var watched = false;
					if (tvshow.playcount > 0 && !filterShowWatched) { watched = true; }
					if (filterWatched && watched) { return; }
					var thumb = (tvshow.thumbnail? xbmc.getThumbUrl(tvshow.thumbnail) : 'images/thumb' + xbmc.getTvShowThumbType() + '.png');
					var $tvshow = $('<div class="tvshow'+tvshow.tvshowid+' thumbWrapper thumb' + xbmc.getTvShowThumbType() + 'Wrapper">' +
							'<div class="linkTVWrapper">' + 
								'<a href="" class="season">' + mkf.lang.get('btn_seasons') + '</a>' +
								'<a href="" class="info">' + mkf.lang.get('btn_information') + '</a>' +
								'<a href="" class="unwatched">' + mkf.lang.get('btn_unwatched') + '</a>' +
							'</div>' +
							(useLazyLoad?
								'<img src="images/loading_thumb' + xbmc.getTvShowThumbType() + '.gif" alt="' + tvshow.label + '" class="thumb thumb' + xbmc.getTvShowThumbType() + '" original="' + thumb + '" />':
								'<img src="' + thumb + '" alt="' + tvshow.label + '" class="thumb thumb' + xbmc.getTvShowThumbType() + '" />'
							) +
							'<div class="tvshowName">' + tvshow.label + (watched? '<img src="images/OverlayWatched_Small.png" />' : '') + '</div>' +
							'<div class="findKeywords">' + tvshow.label.toLowerCase() + '</div>' +
						'</div>')
						.appendTo($tvShowList);
					$tvshow.find('.season').bind('click', {idTvShow: tvshow.tvshowid, strTvShow: tvshow.label, objParentPage: parentPage}, uiviews.SeasonsList);
					$tvshow.find('.info').bind('click', {'tvshow': tvshow}, uiviews.TVShowInfoOverlay);
					$tvshow.find('.unwatched').bind('click', {idTvShow: tvshow.tvshowid, strTvShow: tvshow.label, objParentPage: parentPage}, uiviews.Unwatched);
				});

			}
			return $tvShowList;
		},
		
		/*----TV seasons list----*/
		TVSeasonsViewList: function(seasons, idTvShow, parentPage) {
			var $seasonsList = $('<ul class="fileList"></ul>');

				$.each(seasons.seasons, function(i, season)  {
					var watched = false;
					var filterWatched = mkf.cookieSettings.get('watched', 'no')=='yes'? true : false;
					var filterShowWatched = mkf.cookieSettings.get('hidewatchedmark', 'no')=='yes'? true : false;
					
					if (season.playcount > 0 && !filterShowWatched) { watched = true; }
					if (filterWatched && watched) { return; }
					
					var $season = $('<li' + (i%2==0? ' class="even"': '') + '><div class="linkWrapper"> <a href="" class="season' + i +
					'">' + season.label + (watched? '<img src="images/OverlayWatched_Small.png" />' : '') + '</a></div></li>').appendTo($seasonsList);
					$season.find('a').bind('click',{idTvShow: idTvShow,seasonNum: season.season, strSeason: season.label, objParentPage: parentPage}, uiviews.SeasonEpisodes);
				});

			return $seasonsList;
		},
		
		/*----TV episodes list----*/
		TVEpisodesViewList: function(eps) {
			//var useLazyLoad = mkf.cookieSettings.get('lazyload', 'no')=='yes'? true : false;
			var filterWatched = mkf.cookieSettings.get('watched', 'no')=='yes'? true : false;
			var filterShowWatched = mkf.cookieSettings.get('hidewatchedmark', 'no')=='yes'? true : false;
			//var useFanart = mkf.cookieSettings.get('usefanart', 'no')=='yes'? true : false;
			
			var $episodeList = $('<ul class="fileList"></ul>');

			$.each(eps.episodes, function(i, episode)  {
				var watched = false;
				var filterWatched = mkf.cookieSettings.get('watched', 'no')=='yes'? true : false;
				var filterShowWatched = mkf.cookieSettings.get('hidewatchedmark', 'no')=='yes'? true : false;
				
				if (episode.playcount > 0 && !filterShowWatched) { watched = true; }
				if (filterWatched && watched) { return; }
				
				var $episode = $('<li' + (i%2==0? ' class="even"': '') + '><div class="folderLinkWrapper episode' + episode.episodeid +
				'"> <a href="" class="button playlist" title="' + mkf.lang.get('btn_enqueue') +
				'"><span class="miniIcon enqueue" /></a><a href="" class="button info" title="' + mkf.lang.get('btn_information') +
				'"><span class="miniIcon information" /></a><a href="" class="episode play">' + episode.episode +
				'. ' + episode.label + '' + (watched? '<img src="images/OverlayWatched_Small.png" />' : '') + '</a></div></li>').appendTo($episodeList);

				$episode.find('.play').bind('click', {idEpisode: episode.episodeid}, uiviews.EpisodePlay);
				$episode.find('.playlist').bind('click', {idEpisode: episode.episodeid}, uiviews.AddEpisodeToPlaylist);
				$episode.find('.information').bind('click', {idEpisode: episode.episodeid}, uiviews.EpisodeInfo);
			});

			return $episodeList;
		},
		
		/*----TV Recently Added----*/
		//Isn't this just an episodes view?
		TVRecentViewInfoList: function(eps, parentPage, options) {

			var useLazyLoad = mkf.cookieSettings.get('lazyload', 'no')=='yes'? true : false;
			var filterWatched = mkf.cookieSettings.get('watched', 'no')=='yes'? true : false;
			var filterShowWatched = mkf.cookieSettings.get('hidewatchedmark', 'no')=='yes'? true : false;
			//var useFanart = mkf.cookieSettings.get('usefanart', 'no')=='yes'? true : false;
			
			if (options) { filterWatched = options.filterWatched };
			
			var $episodeList = $('<ul class="RecentfileList"></ul>');

				$.each(eps.episodes, function(i, episode)  {
					var watched = false;	
					if (episode.playcount > 0 && !filterShowWatched) { watched = true; }
					if (filterWatched && watched) { return; }
					
					var thumb = (episode.thumbnail? xbmc.getThumbUrl(episode.thumbnail) : 'images/thumb.png');
					var $episode = $('<li><div class="recentTVshow">' + 
					'<div class="recentTVenq episode' + episode.episodeid + '"> <a href="" class="button playlist recentTVplay" title="' + mkf.lang.get('btn_enqueue') + '"><span class="miniIcon enqueue" /></a></div>' + 
					(useLazyLoad?
					'<div class="recentTVthumb"><img src="images/loading_thumb.gif" alt="' + episode.label + '" class="thumb thumbFanart episode play" original="' + thumb + '" /></div>':
					//'<div class="recentTVthumb"><img src="' + thumb + '" alt="' + episode.label + '" class="thumbFanart episode play" /></div>':
					'<div class="recentTVthumb"><img src="' + thumb + '" alt="' + episode.label + '" class="thumbFanart episode play" /></div>'
					) +
					'<div class="recentTVshowName unwatchedEps" title="' + mkf.lang.get('btn_unwatched') + '">' + episode.showtitle + (watched? '<img src="images/OverlayWatched_Small.png" class="epWatched" />' : '') + 
					'</div><div class="recentTVshowSE">Season: ' + episode.season + ' - Episode: ' +episode.episode + 
					'</div><div class="recentTVtitle">' + episode.label + '</div><div class="recentTVplot">' + episode.plot + '</div></div></li>').appendTo($episodeList);
					
					$episode.find('.play').bind('click', {idEpisode: episode.episodeid}, uiviews.EpisodePlay);
					$episode.find('.playlist').bind('click', {idEpisode: episode.episodeid}, uiviews.AddEpisodeToPlaylist);
					$episode.find('.unwatchedEps').bind('click', {idTvShow: episode.tvshowid, strTvShow: episode.showtitle, objParentPage: parentPage}, uiviews.Unwatched);
				});

			return $episodeList;
		},
		
		/*----TV unwatched episodes----*/
		TVUnwatchedEpsViewList: function(eps) {
			var $episodeList = $('<ul class="fileList"></ul>').appendTo($(this));
				$.each(eps, function(i, episode)  {
					var $episode = $('<li' + (i%2==0? ' class="even"': '') + '><div class="folderLinkWrapper episode' + episode.episodeid + '"> <a href="" class="button playlist" title="' + mkf.lang.get('btn_enqueue') + 
					'"><span class="miniIcon enqueue" /></a><a href="" class="button info" title="' + mkf.lang.get('btn_information') + '"><span class="miniIcon information" /></a><a href="" class="episode play">' +
					//var $episode = $('<li' + (i%2==0? ' class="even"': '') + '><div class="folderLinkWrapper episode' + episode.episodeid + '">' +
					//'<span class="miniIcon information"><a href="" class="button info" title="' + mkf.lang.get('btn_information') + '"></a></span><a href="" class="episode play">' + 
					'S' + episode.season + 'E' + episode.episode + '. ' + episode.label + '</a></div></li>').appendTo($episodeList);

					$episode.find('.play').bind('click', {idEpisode: episode.episodeid}, uiviews.EpisodePlay);
					$episode.find('.playlist').bind('click', {idEpisode: episode.episodeid}, uiviews.AddEpisodeToPlaylist);
					$episode.find('.information').bind('click', {idEpisode: episode.episodeid}, uiviews.EpisodeInfo);
				});
				
			return 	$episodeList;
		},
		
/*----------------*/
/* Playlist views */
/*----------------*/

		/*------------------*/
		PlaylistAudioViewList: function(playlist) {
				var page = $('<div></div>');
				var $itemList = $('<ul class="fileList" id="sortable"></ul>').appendTo(page);
				var runtime = 0;
					$.each(playlist.items, function(i, item)  {
						// for files added via file function
						if (item.type != 'unknown') {
							var artist = (item.artist? item.artist : mkf.lang.get('label_not_available'));
							var album = (item.album? item.album : mkf.lang.get('label_not_available'));
							var label = (item.label? item.label : mkf.lang.get('label_not_available'));
							var title = (item.title? item.title : label);
							//var duration = (item.duration? item.duration : '');
						} else {
							var label = (item.label? item.label : mkf.lang.get('label_not_available'));
						};
						var duration = (item.duration? item.duration : '');
						var playlistItemClass = '';
						if (i%2==0) {
							playlistItemClass = 'even';
						}
						// what to about runtime and added files? console.log(runtime);
						runtime += duration;
						playlistItemCur = 'playlistItem';
						//Change background colour of currently playing item.
						/*if (i == xbmc.periodicUpdater.curPlaylistNum && xbmc.periodicUpdater.playerStatus != 'stopped') {
							playlistItemClass = 'current';
						}*/
						
						if (i == xbmc.periodicUpdater.curPlaylistNum && xbmc.periodicUpdater.playerStatus != 'stopped') {
							playlistItemCur = 'playlistItemCur';
							$('#content').scrollTop($('.fileList li:nth-child(' + i + ')').position().top);
						} else {
							playlistItemCur = 'playlistItem';
						}
						
						$item = $('<li class="' + playlistItemClass + '" id="apli' + i + '"><div class="folderLinkWrapper playlistItem' + i + '">' + 
							'<a class="button remove" href="" title="' + mkf.lang.get('btn_remove') +  '"><span class="miniIcon remove" /></a><span class="miniIcon playlistmove" title="' + mkf.lang.get('btn_swap') +  '" />' +
							'<a class="' + playlistItemCur + ' apli' + i + ' play" href="">' + (i+1) + '. ' +
							(artist? artist + ' - ' : '') + (album? album + ' - ' : '') + (title? title : label) + '&nbsp;&nbsp;&nbsp;&nbsp;' + (duration? xbmc.formatTime(duration) : '') +
							'<div class="findKeywords">' + artist.toLowerCase() + ' ' + album.toLowerCase() + ' ' + label.toLowerCase() + '</div>' +
							'</a></div></li>').appendTo($itemList);

						$item.find('a.play').bind('click', {itemNum: i}, uiviews.PlaylistAudioItemPlay);
						$item.find('a.remove').bind('click', {itemNum: i}, uiviews.PlaylistAudioItemRemove);
					});
				
				if (runtime > 0) {
						$('<p>' + mkf.lang.get('label_total_runtime') + xbmc.formatTime(runtime) + '</p>').appendTo($itemList);
				}
				
				
				page.find('#sortable').sortable({
					helper: 'clone',
					handle : '.playlistmove',
					update: function(event, ui) {
						var messageHandle = mkf.messageLog.show(mkf.lang.get('message_swap_playlist'));
						xbmc.swapAudioPlaylist({
							plFrom: ui.item.attr("id").replace(/[^\d]+/g, ''),
							plTo: ui.item.prevAll().length,
							onSuccess: function() {
								mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_ok'), 2000, mkf.messageLog.status.success);
								// update playlist - $each classRemove classAdd new IDs?
								awxUI.onMusicPlaylistShow();
							},
							onError: function(errorText) {
								mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_failed'), 8000, mkf.messageLog.status.error);
							}
						});
					}
				});
				
			return page;
		},
		
		/*------------------*/
		PlaylistVideoViewList: function(playlist) {
				var page = $('<div></div>');
				var $itemList = $('<ul class="fileList" id="sortable"></ul>').appendTo(page);
				var runtime = 0;
					$.each(playlist.items, function(i, item)  {
						var showtitle = (item.showtitle? item.showtitle : mkf.lang.get('label_not_available'));
						var title = (item.label? item.label : mkf.lang.get('label_not_available'));
						var season = (item.season? item.season : mkf.lang.get('label_not_available'));
						var duration  = (item.runtime? item.runtime : 0);
						if (duration != 0) {
							duration = duration * 60;
							runtime += duration;
						};
						var playlistItemClass = '';
						if (i%2==0) {
							playlistItemClass = 'even';
						};

						//initial marking of currently playing item. After periodic sets.
						if (i == xbmc.periodicUpdater.curPlaylistNum && xbmc.periodicUpdater.playerStatus != 'stopped') {
							playlistItemCur = 'playlistItemCur';
							//$('#content').scrollTop($('.fileList li:nth-child(' + i + ')').position().top);
						} else {
							playlistItemCur = 'playlistItem';
						};			
						$item = $('<li class="' + playlistItemClass + '" id="vpli' + i + '"><div class="folderLinkWrapper playlistItem' + i + '">' + 
							'<a class="button remove" href="" title="' + mkf.lang.get('btn_remove') +  '"><span class="miniIcon remove" /></a><span class="miniIcon playlistmove" title="' + mkf.lang.get('btn_swap') +  '"/>' +
							'<a class="' + playlistItemCur  + ' vpli' + i + ' play" href="">' + (i+1) + '. ' +
							(item.type=='episode'? showtitle + ' - Season ' + season + ' - ' + title : title) + '&nbsp;&nbsp;&nbsp;&nbsp;' + xbmc.formatTime(duration) +
							'</a></div></li>').appendTo($itemList);

						$item.find('a.play').bind('click', {itemNum: i}, uiviews.PlaylistVideoItemPlay);
						$item.find('a.remove').bind('click', {itemNum: i}, uiviews.PlaylistVideoItemRemove);
					});

				if (runtime > 0) {
					$('<p>' + mkf.lang.get('label_total_runtime') + xbmc.formatTime(runtime) + '</p>').appendTo($itemList);
				}
				
				page.find('#sortable').sortable({
					helper: 'clone',
					handle : '.playlistmove',
					update: function(event, ui) {
						var messageHandle = mkf.messageLog.show(mkf.lang.get('message_swap_playlist'));
						xbmc.swapVideoPlaylist({
							plFrom: ui.item.attr("id").replace(/[^\d]+/g, ''),
							plTo: ui.item.prevAll().length,
							onSuccess: function() {
								mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_ok'), 2000, mkf.messageLog.status.success);
								// update playlist - $each classRemove classAdd new IDs?
								awxUI.onVideoPlaylistShow();
							},
							onError: function(errorText) {
								mkf.messageLog.appendTextAndHide(messageHandle, mkf.lang.get('message_failed'), 8000, mkf.messageLog.status.error);
							}
						});
					}
				});
				
			return page;		
		}
		
	}); // END ui.views
})(jQuery);
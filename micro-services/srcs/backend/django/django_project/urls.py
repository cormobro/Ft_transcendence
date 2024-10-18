"""
URL configuration for django_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
	https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
	1. Add an import:  from my_app import views
	2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
	1. Add an import:  from other_app.views import Home
	2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
	1. Import the include() function: from django.urls import include, path
	2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.urls import re_path
from django_app.views import home
from django_app.views import manage_request
from django_app.views import manage_42_api_step1
from django_app.views import manage_42_api_step2
from django_app.views import create_account
from django_app.views import logout
from django_app.views import match_end
from django_app.views import log_in
from django_app.views import get_best_players
from django_app.views import get_global_stats
from django_app.views import get_solo_stats
from django_app.views import get_duo_stats
from django_app.views import get_tournament_stats
from django_app.views import get_victories
from django_app.views import get_defeats
from django_app.views import get_victories_mode
from django_app.views import get_points_by_match
from django_app.views import get_match_stats
from django_app.views import is_user_signed_in
from django_app.views import get_avatar
from django_app.views import post_avatar
from django_app.views import get_requests
from django_app.views import post_decline_request
from django_app.views import post_remove_friend
from django_app.views import post_add_friend
from django_app.views import get_friends_list
from django_app.views import post_username
from django_app.views import post_password
from django_app.views import tournament_end
from django_app.views import set_block
from django_app.views import get_block
from django_app.views import get_current_user

urlpatterns = [
	path ('', manage_request, name='home'),
	path ('get/', manage_request, name='home'),
	path ('post/', manage_request, name='home'),
	path ('api_42/', manage_42_api_step1, name='home'),
	path ('api_code/', manage_42_api_step2, name='home'),
	path ('register/', create_account, name='home'),
	path ('login/', log_in, name='home'),
	path ('logout/', logout, name='home'),
	path ('post/match/', match_end, name='home'),
	path ('post/tournament/', tournament_end, name='home'),
	path ('admin/', admin.site.urls),
	path ('get/bestplayers/', get_best_players, name='home'),
	path ('get/globalstats/', get_global_stats, name='home'),
	path ('get/solostats/', get_solo_stats, name='home'),
	path ('get/duostats/', get_duo_stats, name='home'),
	path ('get/tournamentstats/', get_tournament_stats, name='home'),
	path ('get/victories/', get_victories, name='home'),
	path ('get/defeats/', get_defeats, name='home'),
	path ('get/victoriesbymode/', get_victories_mode, name='home'),
	path ('get/pointsbymatch/', get_points_by_match, name='home'),
	path ('get/matchstats/', get_match_stats, name='home'),
	path ('get/isuserconnected/', is_user_signed_in, name='home'),
	path ('get/avatar/', get_avatar, name='home'),
	path ('post/avatar/', post_avatar, name='home'),
	path ('get/friendrequests/', get_requests, name='home'),
	path ('post/declinefriendrequest/', post_decline_request, name='home'),
	path ('post/removefriend/', post_remove_friend, name='home'),
	path ('post/addfriend/', post_add_friend, name='home'),
	path ('get/friendslist/', get_friends_list, name='home'),
	path ('post/username/', post_username, name='home'),
	path ('post/password/', post_password, name='home'),
	path('get/setblock/', set_block, name='home'),
	path('get/getblock/', get_block, name='home'),
	path ('get/currentuser/', get_current_user, name='home'),
	re_path(r'^media/(?P<path>.*)$', serve,{'document_root': settings.MEDIA_ROOT}),
	re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT})
]

if settings.DEBUG:
		urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

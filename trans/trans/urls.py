"""
URL configuration for trans project.

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
from polls.views import home
from polls.views import manage_request
from polls.views import manage_42_api_step1
from polls.views import manage_42_api_step2
from polls.views import create_account
from polls.views import logout
from polls.views import match_end
from polls.views import log_in
from polls.views import set_block
from polls.views import get_block
# from polls.views import tournament_end


#urlpatterns = [
#	path ('', manage_request, name='home'),
#	path ('get/', manage_request, name='home'),
#	path ('post/', manage_request, name='home'),
#	path ('api_42/', manage_42_api_step1, name='home'),
#	path ('api_code/', manage_42_api_step2, name='home'),
#	path ('register/', create_account, name='home'),
#	path ('login/', log_in, name='home'),
#	path ('logout/', logout, name='home'),
#	path ('post/match/', match_end, name='home'),
	# path ('tournament_end/', tournament_end, name='home'),
	# path ('get_user_info', give_user_info, name='home'),
#    path('admin/', admin.site.urls),
#]

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
	# path ('tournament_end/', tournament_end, name='home'),
	# path ('get_user_info', give_user_info, name='home'),
	path('admin/', admin.site.urls),
	path('get/setblock/', set_block, name='home'),
	path('get/getblock/', get_block, name='home')
]

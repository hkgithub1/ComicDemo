from urllib.request import Request
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ComicPrimarySerializer
from .serializers import UserPrimarySerializer
from .models import Comics
from itertools import chain

from django.contrib.auth.models import User

class AddUserEndPoint(APIView):
    serializer_class = UserPrimarySerializer

    def post(self, request, format=None):
        payload = self.serializer_class(data=request.data)
        if payload:        
            username = payload.initial_data.get("username")
            password = payload.initial_data.get("password")
            email = payload.initial_data.get("email")
            first_name = payload.initial_data.get("first_name")
            last_name = payload.initial_data.get("last_name")
            
            user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
            user.save()            
            data = UserPrimarySerializer(user).data
            return Response(data, status=status.HTTP_201_CREATED)
        
        return Response({"Invalid Request" : "No Data"}, status=status.HTTP_400_BAD_REQUEST)

class AddBookEndPoint(APIView):
    serializer_class = ComicPrimarySerializer

    def post(self, request, format=None):
        payload = self.serializer_class(data=request.data)
        if payload:        
            name = payload.initial_data.get("book_name")
            auth = payload.initial_data.get("book_author")
            year = payload.initial_data.get("book_year")
            pub = payload.initial_data.get("book_publisher")
            iss = payload.initial_data.get("book_issues")
            price = payload.initial_data.get("book_price")
            firstimg = payload.initial_data.get("first_image")
            secondimg = payload.initial_data.get("second_image")
            thirdimg = payload.initial_data.get("third_image")
            fourthimg = payload.initial_data.get("fourth_image")
            fifthimg = payload.initial_data.get("fifth_image")
            sixthimg = payload.initial_data.get("sixth_image")
            seventhimg = payload.initial_data.get("seventh_image")
            eighthimg = payload.initial_data.get("eighth_image")
            
            record = Comics(book_name=name, book_author=auth, book_year=year, 
                            book_publisher=pub, book_issues=iss, book_price=price,                        
                            first_image=firstimg, second_image=secondimg, third_image=thirdimg,
                            fourth_image=fourthimg, fifth_image=fifthimg, sixth_image=sixthimg,
                            seventh_image=seventhimg, eighth_image=eighthimg,
                        )
            record.save()            
            data = ComicPrimarySerializer(record).data
            return Response(data, status=status.HTTP_201_CREATED)
        
        return Response({"Invalid Request" : "No Data"}, status=status.HTTP_400_BAD_REQUEST)        


class SearchBooksEndPoint(APIView):
    lookup_url_kwarg_bn = "bn"
    lookup_url_kwarg_ba = "ba"
    lookup_url_kwarg_by = "by"
    lookup_url_kwarg_bp = "bp"

    def get(self, request, format=None):
        bn = request.GET.get(self.lookup_url_kwarg_bn)
        ba = request.GET.get(self.lookup_url_kwarg_ba)
        by = request.GET.get(self.lookup_url_kwarg_by)
        bp = request.GET.get(self.lookup_url_kwarg_bp)

        name_results = {}
        author_results = {}
        year_results = {}
        pub_results = {}
        
        if bn:
            name_results = Comics.objects.filter(book_name__icontains=bn)
        if ba:
            author_results = Comics.objects.filter(book_author__icontains=ba)
        if by:
            year_results = Comics.objects.filter(book_year=by)
        if bp:
            pub_results = Comics.objects.filter(book_publisher__icontains=bp)

        output_list = list(set(chain(name_results, author_results, year_results, pub_results)))

        if output_list:        
            data = ComicPrimarySerializer(output_list, many=True).data
            return Response(data, status=status.HTTP_200_OK)
        
        data = ComicPrimarySerializer(output_list, many=True).data
        return Response(data, status=status.HTTP_404_NOT_FOUND)


class DeleteBookEndPoint(APIView):
    def delete(self, request, id, format=None):
        result = Comics.objects.get(id=id)
        if result:
            result.delete()
            return Response({ "Response" : "Success" }, status=status.HTTP_204_NO_CONTENT)
        
        return Response({"Invalid Request": "Not Found"}, status=status.HTTP_404_NOT_FOUND)


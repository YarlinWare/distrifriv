from django.shortcuts import render

def juego_1(request):
    return render(request, '../templates/simon/SimonColors.html')

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .mongo import collection

@api_view(['POST'])
def create_log(request):
    collection.insert_one(request.data)
    return Response({"msg": "log added"})

@api_view(['GET'])
def get_logs(request):
    logs = list(collection.find({}, {"_id": 0}))
    return Response(logs)

@api_view(['DELETE'])
def clear_logs(request):
    collection.delete_many({})
    return Response({"msg": "logs cleared"})

@api_view(['PUT'])
def update_log(request):
    student_id = request.data.get("student_id")
    new_action = request.data.get("action")

    collection.update_one(
        {"student_id": student_id},
        {"$set": {"action": new_action}}
    )

    return Response({"msg": "updated"})

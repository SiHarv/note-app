require "test_helper"

class NotesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @note = notes(:one)
  end

  test "should get index" do
    get api_v1_notes_path, as: :json
    assert_response :success
  end

  test "should create note" do
    assert_difference("Note.count", 1) do
      post api_v1_notes_path, params: { note: { note: "New Note", status: "active" } }, as: :json
    end

    assert_response :created
  end

  test "should show note" do
    get api_v1_note_path(@note), as: :json
    assert_response :success
  end

  test "should update note" do
    patch api_v1_note_path(@note), params: { note: { note: "Updated" } }, as: :json
    assert_response :success
  end

  test "should destroy note" do
    assert_difference("Note.count", -1) do
      delete api_v1_note_path(@note), as: :json
    end

    assert_response :no_content
  end
end

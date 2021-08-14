require "test_helper"

class NonPlayableCharactersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @non_playable_character = non_playable_characters(:one)
  end

  test "should get index" do
    get non_playable_characters_url
    assert_response :success
  end

  test "should get new" do
    get new_non_playable_character_url
    assert_response :success
  end

  test "should create non_playable_character" do
    assert_difference('NonPlayableCharacter.count') do
      post non_playable_characters_url, params: { non_playable_character: { city: @non_playable_character.city, first_name: @non_playable_character.first_name, last_name: @non_playable_character.last_name, race: @non_playable_character.race, weapon: @non_playable_character.weapon } }
    end

    assert_redirected_to non_playable_character_url(NonPlayableCharacter.last)
  end

  test "should show non_playable_character" do
    get non_playable_character_url(@non_playable_character)
    assert_response :success
  end

  test "should get edit" do
    get edit_non_playable_character_url(@non_playable_character)
    assert_response :success
  end

  test "should update non_playable_character" do
    patch non_playable_character_url(@non_playable_character), params: { non_playable_character: { city: @non_playable_character.city, first_name: @non_playable_character.first_name, last_name: @non_playable_character.last_name, race: @non_playable_character.race, weapon: @non_playable_character.weapon } }
    assert_redirected_to non_playable_character_url(@non_playable_character)
  end

  test "should destroy non_playable_character" do
    assert_difference('NonPlayableCharacter.count', -1) do
      delete non_playable_character_url(@non_playable_character)
    end

    assert_redirected_to non_playable_characters_url
  end
end

require "application_system_test_case"

class NonPlayableCharactersTest < ApplicationSystemTestCase
  setup do
    @non_playable_character = non_playable_characters(:one)
  end

  test "visiting the index" do
    visit non_playable_characters_url
    assert_selector "h1", text: "Non Playable Characters"
  end

  test "creating a Non playable character" do
    visit non_playable_characters_url
    click_on "New Non Playable Character"

    fill_in "City", with: @non_playable_character.city
    fill_in "First name", with: @non_playable_character.first_name
    fill_in "Last name", with: @non_playable_character.last_name
    fill_in "Race", with: @non_playable_character.race
    fill_in "Weapon", with: @non_playable_character.weapon
    click_on "Create Non playable character"

    assert_text "Non playable character was successfully created"
    click_on "Back"
  end

  test "updating a Non playable character" do
    visit non_playable_characters_url
    click_on "Edit", match: :first

    fill_in "City", with: @non_playable_character.city
    fill_in "First name", with: @non_playable_character.first_name
    fill_in "Last name", with: @non_playable_character.last_name
    fill_in "Race", with: @non_playable_character.race
    fill_in "Weapon", with: @non_playable_character.weapon
    click_on "Update Non playable character"

    assert_text "Non playable character was successfully updated"
    click_on "Back"
  end

  test "destroying a Non playable character" do
    visit non_playable_characters_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Non playable character was successfully destroyed"
  end
end
